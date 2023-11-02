const { default: client } = require("./client")

const userService = {

   getUser: (token) => {
    return client('GET',`/api/user`,null,token);
   },
    
    updateUser: (userId, payload) => {
        return client('PUT',`/api/user/${userId}`,payload);
    }
}

export default userService;