"use client";
import * as yup from "yup";
import useAuthModule from "../lib/auth_service";
import { Form, FormikProvider, useFormik } from "formik";
import { LoginPayload } from "../interface/auth_interface";
import Image from "next/image";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const LoginPage = () => {
  const { useLogin } = useAuthModule();
  const { error, isError, mutate, isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: loginSchema.getDefault(),
    enableReinitialize: true,
    onSubmit: (payload: any) => {
      mutate(payload);
    },
  });
  const { handleBlur, handleSubmit, values, errors, setFieldValue } = formik;

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md md:w-96 w-[23rem]">
        <section className="text-2xl font-bold mb-6">
          <Image
            src={"/assets/logo-ndp-001-400px.png"}
            alt="logo"
            width={100}
            height={100}
          />
        </section>

        <FormikProvider value={formik}>
          <Form>
            <div className="mb-4">
              <Label htmlFor="email" title="email" isRequired />
              <InputText
                value={values.email}
                onChange={(e: any) => {
                  setFieldValue("email", e.target.value);
                }}
                id="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="email"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" title="password" isRequired />
              <InputText
                value={values.password}
                onChange={(e: any) => {
                  setFieldValue("password", e.target.value);
                }}
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 p-2 rounded"
                placeholder="password"
              />
            </div>

            <Button
              title="Login"
              colorSchema="blue"
              height="xl"
              isLoading={isLoading}
              disabled={isLoading}
            />
          </Form>
        </FormikProvider>

        <p className="text-sm mt-4">
          Dont have an account?{" "}
          <a href="/auth/register" className="text-blue-500">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
