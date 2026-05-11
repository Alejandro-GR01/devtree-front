import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

const AdminNavigation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("AUTH_TOKEN");
    navigate('/auth/login', {replace: true})
    queryClient.resetQueries({ queryKey: ["user"] });
  };

  return (
    <button
      className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
      onClick={logout}
    >
      Cerrar Sesión
    </button>
  );
};

export default AdminNavigation;
