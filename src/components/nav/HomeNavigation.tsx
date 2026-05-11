import { Link } from "react-router";

const HomeNavigation = () => {
  return (
    <>
      <Link
        to="/auth/login"
        className="text-white p-2 cursor-pointer uppercase font-black text-xs "
      >
        Iniciar Sesíon
      </Link>
      <Link
        to="/auth/register"
        className="text-slate-800 bg-lime-500 p-2 cursor-pointer uppercase font-black text-xs  rounded-lg"
      >
        Registrarme
      </Link>
    </>
  );
};

export default HomeNavigation;
