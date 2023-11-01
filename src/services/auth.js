const { default: client } = require("./client")

const authService = {

    register: (payload) => {
        console.log("here");
        return client('POST','/api/auth/register',payload);
    },

    login: (payload) => {
        console.log("login");
        return client('POST','/api/auth/login',payload);
    },

}

export default authService;