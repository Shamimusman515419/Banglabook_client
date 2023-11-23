import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const GetSingleUser = ({ id }) => {

     const { data, refetch, isLoading } = useQuery({
          queryKey: ['userId'],
          queryFn: () => axios.get(`http/localhost:5000/userId/${id}`),
     })
     const userinfo = data
     return [userinfo, refetch, isLoading]
};

export default GetSingleUser;