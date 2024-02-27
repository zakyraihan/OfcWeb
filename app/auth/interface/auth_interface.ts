import { BaseResponseSucces } from "@/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  refresh_token: string;
  access_token: string;
  avatar: string;
  role: string;
}

export interface RegisterPayload extends Pick<User, 'nama' | 'email' | 'password'> {}
export interface RegisterResponse extends BaseResponseSucces {}

export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface LoginResponse extends BaseResponseSucces {
  data: User;
}

