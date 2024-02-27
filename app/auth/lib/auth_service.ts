import { useToast } from "@/hook/useToast";
import {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "../interface/auth_interface";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useAuthModule = () => {
  const { toastSuccess, toastWarning, toastError } = useToast();
  const router = useRouter();

  const register = async (
    payload: RegisterPayload
  ): Promise<RegisterResponse> => {
    return axiosClient.post("/auth/register", payload).then((res) => res.data);
  };

  const useRegister = () => {
    const { mutate, isLoading, isError, error } = useMutation({
      mutationFn: (payload: RegisterPayload) => register(payload),
      onSuccess: (response: any) => {
        router.push("/auth/login");
        toastSuccess(response.message);
      },
      onError: (error: any) => {
        if (error.response && error.response.status) {
          toastWarning(error.response.data.message);
        }
      },
    });

    return { mutate, isError, error, isLoading };
  };

  const login = async (payload: LoginPayload): Promise<LoginResponse> => {
    return axiosClient.post("/auth/login", payload).then((res) => res.data);
  };

  const useLogin = () => {
    const { mutate, isLoading, isError, error } = useMutation({
      mutationFn: (payload: LoginPayload) => login(payload),
      onSuccess: async (response: any) => {
        router.push("/");
        toastSuccess(response.message);
      },
      onError: (error: any) => {
        if (error.response.status == 422) {
          toastWarning(error.response.data.message);
        } else {
          toastError();
        }
      },
    });

    return { mutate, isLoading, isError, error };
  };

  return { useRegister, useLogin };
};

export default useAuthModule;
