const { default: client } = require("./client")

const userService = {

   getUser: (userId) => {
    console.log("user");
    return client('GET',`/api/user/${userId}`);
   },
    
    updateUser: (userId, payload) => {
        console.log("user");
        return client('PUT',`/api/user/${userId}`,payload);
    }
}

export default userService;