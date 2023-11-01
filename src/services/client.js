const HOST = "http://localhost:5000";

const client = async (method,url,data) => {
    try{
        const finalUrl = `${HOST}${url}`;
    
        const result = await fetch(finalUrl, {
            method,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': "application/json"
                //'Authorization': 'Bearer ...'
            }
        })
        console.log("res",result);

        if(!result.ok){
            const error = result.body;
            console.log(">>>>>error client",error);
            const json = await result.json();
            console.log(">>>>client json error",json)
            const errorPayload = {
                status: result.status,
                ok: result.ok,
                message: json.message ?? { message: "hola" }
            }
            throw errorPayload;
        }

        const json = await result.json();

        return json;
    }catch(error){
        console.log("There was an error",error);
        throw error;
    }

}

export default client;