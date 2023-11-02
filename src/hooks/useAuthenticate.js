import { STORAGE_KEYS } from "@/contants";
import storage from "@/utils/storage";
import React from "react";

import { useRouter } from "next/navigation";

const useAuthenticate = () => {

    const [status,setStatus] = React.useState("authenticating");
    const router = useRouter()

    React.useEffect(
        () => {
            const token = storage.get(STORAGE_KEYS.ACCESS_TOKEN);
            if(token){
                setStatus("authenticated")
            } else {
                router.push('/')
            }
        },
        [router]
    )

    return {
        status,
        isAuthenticated: status === "authenticated"
    }

}

export default useAuthenticate;