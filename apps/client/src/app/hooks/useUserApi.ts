import { useEffect, useState } from 'react';
import { ERoles, IUser } from '@admin-management/types';
import userApi from '../services/userApi';
import { message } from 'antd';
import { useMessage } from '../providers/MessageProvider';

export const useUserApi = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { success, error } = useMessage();

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    userApi
      .fetchUsers()
      .then((data) => {
        if (mounted) {
          setUsers(data);
        }
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : 'Failed to fetch users';
        error(msg);
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  const handleChangeRole = async (userId: number, nextRole: ERoles) => {
    const prev = users;
    setUsers((curr) =>
      curr.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
    );
    try {
      await userApi.updateUserRole(userId, nextRole);
      message.success('Role updated');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to update role';
      setUsers(prev);
      message.error(msg);
    }
  };

  return { users, loading, handleChangeRole };
};
