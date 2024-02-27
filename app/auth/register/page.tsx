"use client";
import * as yup from "yup";
import useAuthModule from "../lib/auth_service";
import { useFormik } from "formik";
import { RegisterPayload } from "../interface/auth_interface";
import Image from "next/image";
import InputText from "@/components/InputText";
import Label from "@/components/Label";
import Button from "@/components/Button";

export const registerSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("Wajib isi"),
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

const RegisterPage = () => {
  const { useRegister } = useAuthModule();
  const { error, isError, mutate, isLoading } = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    enableReinitialize: true,
    onSubmit: (payload) => {
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

        <form>
          <div className="mb-4">
            <Label htmlFor="nama" title="username" isRequired />
            <InputText
              value={values.nama}
              type="text"
              id="nama"
              name="nama"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="username"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="email" title="email" isRequired />
            <InputText
              value={values.email}
              type="text"
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
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 p-2 rounded"
              placeholder="password"
            />
          </div>

          <Button title="Register" colorSchema="blue" height="xl" />
        </form>

        <p className="text-sm mt-4">
          Already have an account?{" "}
          <a href="#" className="text-blue-500">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
