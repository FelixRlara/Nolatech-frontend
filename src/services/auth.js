const { default: client } = require("./client")

const authService = {

    register: (payload) => {
        return client('POST','/api/auth/register',payload);
    },

    login: (payload) => {
        return client('POST','/api/auth/login',payload);
    },

}

export default authService;