import axios from 'axios';
import { ERoles, IUser } from '@admin-management/types';

const api = axios.create({
  baseURL: '/api',
});

namespace userApi {
  export const fetchUsers = async (): Promise<IUser[]> => {
    const { data } = await api.get<IUser[]>('/users');
    return data;
  };

  export const updateUserRoles = async (
    userId: number,
    roles: ERoles[]
  ): Promise<IUser> => {
    const { data } = await api.patch<IUser>(`/users/${userId}/role`, { roles });
    return data;
  };
}

export default userApi;
