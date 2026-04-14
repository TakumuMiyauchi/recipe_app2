import axiosInstance from './axiosInstance';
import type { LoginResponse, MeResponse } from '../types/auth';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const res = await axiosInstance.post<LoginResponse>('/auth/login', { email, password });
  return res.data;
};

export const register = async (userName: string, email: string, password: string): Promise<void> => {
  await axiosInstance.post('/user/register', { userName, email, password });
};

export const getMe = async (): Promise<MeResponse> => {
  const res = await axiosInstance.get<MeResponse>('/auth/me');
  return res.data;
};

export const resetPassword = async (email: string, newPassword: string): Promise<void> => {
  await axiosInstance.post('/user/reset-password', { email, newPassword });
};
