import { Navigate, useParams } from "react-router"
import { getUserByHandle } from "../api/DevTreeApi"
import { useQuery } from "@tanstack/react-query"
import HandleData from "../components/HandleData"
import LoadingView from "./LoadingView"


const HandleView = () => {
    const handle = useParams().handle || ''
    const {data, error, isLoading} =useQuery({
        queryFn: () => getUserByHandle(handle),
        queryKey: ['handle', handle],
        retry: 1
    })
    if(isLoading) return  <LoadingView >Cargando ...</LoadingView>
    if(error) return <Navigate to={'/404'} replace/>
    if(data) return <HandleData data={data} />
    
    
}

export default HandleView