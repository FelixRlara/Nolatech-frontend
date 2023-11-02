import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    try {
        const payload = jwtDecode(token);
        return payload;
    } catch (error) {
    }

}