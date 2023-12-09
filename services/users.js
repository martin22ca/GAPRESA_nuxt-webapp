const URL = 'http://1192.168.0.133:8000' + '/users'

export async function getUsers(filters) {
    try {
        return await useFetch('/', {
            baseURL: URL,
            method: 'GET',
            timeout: 5000,
            params: filters
        })
    } catch (error) {
        console.error('Error fetching Users:', error);
        throw error
    }
}


export async function registerUser(data) {
    try {
        return await useFetch('/register', {
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