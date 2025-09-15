import axios from 'axios';
import { ERoles, IRole, IUser } from '@admin-management/types';

const api = axios.create({
  baseURL: '/api',
});

export namespace roleApi {
  export const getAllRoles = async (): Promise<IRole[]> => {
    const { data } = await api.get<IRole[]>('/roles');
    return data;
  };
}
