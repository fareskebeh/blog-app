import { useState, useEffect } from "react";
import axiosInit from "../services/axios-init";

export const useSavedPosts = () => {
  const token = localStorage.getItem("token");
  const [posts,setPosts] = useState(null)

  const getSavedIds = (args)=> {

    if(args) {
        const cleaned= args.map((arg)=> {
            return arg.id
        })
        return cleaned
    }
    else {
        return
    }
  }

  useEffect(() => {
    if(token) {
      axiosInit.get("saved", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            })
            .then((res) => {
                const ids = getSavedIds(res.data.data)
                localStorage.setItem("saved", JSON.stringify(ids))
                setPosts(res.data.data)
            })
            .catch((err) => {
                console.error(err)
            });
          }
    }, []);

  return posts ? posts : [];
};
