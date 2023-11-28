const baseUrl = 'http://192.168.0.133:8000/config'

export async function getConfig() {
    try {
        return await useFetch('/', {
            baseURL: baseUrl,
            method: 'GET',
            timeout: 5000,
        })
    } catch (error) {
        console.error('Error fetching configuration:', error);
        throw error
    }
}

export async function postAssignment(data) {
    try {
        return await useFetch('/assigment', {
            baseURL: baseUrl,
            method: 'POST',
            timeout: 5000,
            body: data
        })
    } catch (error) {
        console.error('Error fetching configuration:', error);
        throw error
    }
}

export async function postDb(data) {
    try {
        return await useFetch('/db', {
            baseURL: baseUrl,
            method: 'POST',
            timeout: 5000,
            body: data
        })
    } catch (error) {
        console.error('Error fetching configuration:', error);
        throw error
    }
}