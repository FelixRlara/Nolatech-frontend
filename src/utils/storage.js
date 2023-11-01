
const storage = {
    set: (key,value) => {
        localStorage.setItem(key,JSON.stringify(value) )
    },

    get: (key) => {
        const result = localStorage.getItem(key);
        return JSON.parse(result);
    },

    removeAll: () => {
        localStorage.clear()
    }
}

export default storage;