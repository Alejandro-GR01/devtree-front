import { useForm } from "react-hook-form"
import slugify from "react-slugify";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/DevTreeApi";
import { Link } from "react-router";

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { handle: "" } });

  const handle = watch("handle");

  const searchByHandelMutation = useMutation({
    mutationFn: searchByHandle,
  });

  const handelSearch = () => {
    const slug = slugify(handle);
    searchByHandelMutation.mutate(slug);
  };

  return (
    <form onSubmit={handleSubmit(handelSearch)} className="space-y-5">
      <div className="relative flex items-center  bg-white rounded-sm   px-2">
        <label htmlFor="handle">devtree.com/</label>
        <input
          type="text"
          id="handle"
          className="border-none bg-transparent w-full pl-0 focus:ring-0 flex-1 shrink "
          placeholder="elonmusk, zuck, jeffbezos"
          {...register("handle", {
            required: "Un Nombre de Usuario es obligatorio",
          })}
        />
      </div>
      {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

      <div className="mt-2">
        {searchByHandelMutation.isPending && (
          <p className="text-center">Cargando ...</p>
        )}
        {searchByHandelMutation.error && (
          <p className="text-center text-red-600 ">
            {searchByHandelMutation.error.message}
          </p>
        )}
        {searchByHandelMutation.data && (
          <p className="text-center text-cyan-500 ">
            {searchByHandelMutation.data} ir a{" "}
            <Link
              to={"/auth/register"}
              className="text-blue-800 underline"
              state={{ handle: slugify(handle) }}
            >
              Registro
            </Link>
          </p>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-3 text-lg w-min uppercase text-slate-600 rounded-lg font-bold cursor-pointer "
        value="Obtener mi DevTree"
      />
    </form>
  );
};

export default SearchForm;
