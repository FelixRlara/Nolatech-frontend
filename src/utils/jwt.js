import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    console.log(token)
    try {
        const payload = jwtDecode(token);
        return payload;
    } catch (error) {
        console.error(error)
    }

}