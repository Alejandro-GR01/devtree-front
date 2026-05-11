import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../api/DevTreeApi";

const LoginView = () => {
  const queriClient = useQueryClient();
  const navigate = useNavigate();
  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      toast.success("Login exitoso");
      reset();
      queriClient.invalidateQueries({ queryKey: ["user"] });
      setTimeout(() => {
        navigate("/admin", {});
      }, 2000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleLogin = (formData: LoginForm) => {
    loginUserMutation.mutate(formData);
  };

  return (
    <>
      <h1 className="text-xl font-bold text-white">Iniciar Sesion</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Email de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            autoComplete="current-password"
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
          value="Iniciar Sesión"
        />
      </form>
      <nav className="mt-10">
        <Link
          className="text-center text-white text-lg block "
          to="/auth/register"
        >
          No tienes una cuenta ? <b>Crea una aqui</b>
        </Link>
      </nav>
    </>
  );
};

export default LoginView;
