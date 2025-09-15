import { useEffect, useState } from 'react';
import { roleApi } from '../services/roleApi';
import { IRole } from '@admin-management/types';
import { useMessage } from '../providers/MessageProvider';

export const useRolesApi = () => {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useMessage();

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    roleApi
      .getAllRoles()
      .then((data) => {
        if (mounted) {
          setRoles(data);
        }
      })
      .catch((e: unknown) => {
        const msg = e instanceof Error ? e.message : 'Failed to fetch roles';
        error(msg);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { roles, isLoading };
};
