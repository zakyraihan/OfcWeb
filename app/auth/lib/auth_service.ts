import { useToast } from "@/hook/useToast";
import { RegisterPayload, RegisterResponse } from "../interface/auth_interface";
import axiosClient from "@/lib/axiosClient";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

const useAuthModule = () => {
    const {toastSuccess, toastWarning} = useToast();
    const router = useRouter()

    const register =  async (payload: RegisterPayload): Promise<RegisterResponse> => {
        return axiosClient.post('/auth/register', payload).then((res)=> res.data)
    }

    const useRegister = () => {
        const {mutate, isLoading, isError, error} = useMutation({
            mutationFn: (payload:RegisterPayload) => register(payload),
            onSuccess: (response:any) => {
                toastSuccess(response.message)
            }, 
            onError: (error:any) => {
                if(error.response && error.response.status) {
                    toastWarning(error.response.data.message)
                }
            }
        })

        return {mutate, isError, error, isLoading}
    }

    return { useRegister } 

};

export default useAuthModule;
