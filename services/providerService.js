const baseUrl = 'http://localhost:8000/providers'

export async function getProviders() {
    try {
        return await useFetch('/', {
            baseURL: baseUrl,
            method: 'GET',
            timeout: 5000,
        })
    } catch (error) {
        console.error('Error fetching providers:', error);
        throw error
    }
}