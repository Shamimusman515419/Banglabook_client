import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const PostApi = () => {

     const { data, refetch, isLoading } =  useQuery({
          queryKey: ['post'],
          queryFn: () =>  axios.get('https://banglabook-server.vercel.app/post'),
       })

     return [data,refetch,isLoading]
};

export default PostApi;