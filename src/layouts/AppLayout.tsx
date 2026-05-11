import { Navigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeApi.ts";
import DevTree from "../components/DevTree.tsx";
import LoadingView from "../views/LoadingView.tsx";

export default function AppLayout() {
  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 4,
    refetchOnWindowFocus: false,
  });
  
  if (isLoading) return <LoadingView >Cargando ...</LoadingView>;

  if (isError) {
    return <Navigate to={"/auth/login"} replace />;
  }

  if (data) return <DevTree data={data} />;
}
