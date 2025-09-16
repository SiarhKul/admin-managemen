import { useEffect, useState } from 'react';
import { ERoles, IRole, IUser } from '@admin-management/types';
import userApi from '../services/userApi';
import { roleApi } from '../services/roleApi';
import { useMessage } from '../providers/MessageProvider';

export const useTable = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useMessage();

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    Promise.all([userApi.fetchUsers(), roleApi.getAllRoles()])
      .then(([usersData, rolesData]) => {
        if (mounted) {
          setUsers(usersData);
          setRoles(rolesData);
        }
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : 'Failed to fetch data';
        error(msg);
      })
      .finally(() => {
        if (mounted) {
          setIsLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [error]);

  const handleChangeRole = async (userId: number, nextRole: ERoles) => {
    const previousUsers = users;
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === userId ? { ...user, role: nextRole } : user
      )
    );

    try {
      await userApi.updateUserRole(userId, nextRole);
      success('Role updated successfully');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to update role';
      setUsers(previousUsers);
      error(msg);
    }
  };

  return { users, roles, isLoading, handleChangeRole };
};
