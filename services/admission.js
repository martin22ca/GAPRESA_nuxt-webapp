const URL = 'http://192.168.0.133:8000' + '/admission'



export async function isAuth(data) {
    try {
        return await useFetch('/', {
            baseURL: URL,
            method: 'GET',
            timeout: 5000,
            params: data
        })
    } catch (error) {
        console.error('Error in Auth:', error);
        throw error
    }
}

export async function loginUser(data) {
    try {
        return await useFetch('/login', {
            baseURL: URL,
            method: 'POST',
            timeout: 5000,
            body: data
        })
    } catch (error) {
        console.error('Error registering User:', error);
        throw error
    }
}