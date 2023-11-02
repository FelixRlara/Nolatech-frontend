const HOST = "http://localhost:5000";

const client = async (method, url, data, token) => {
    try {
        const finalUrl = `${HOST}${url}`;
        let headers = {};
        if (token) {
            headers['Authorization'] = `bearer ${token}`
        }

        const result = await fetch(finalUrl, {
            method,
            body: data ? JSON.stringify(data) : undefined,
            headers: {
                'Content-Type': "application/json",
                ...headers
            }

        })

        if (!result.ok) {
            const error = result.body;
            const json = await result.json();
            const errorPayload = {
                status: result.status,
                ok: result.ok,
                message: json.message ?? { message: "hola" }
            }
            throw errorPayload;
        }

        const json = await result.json();

        return json;
    } catch (error) {
        throw error;
    }

}

export default client;