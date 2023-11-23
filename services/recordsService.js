const baseUrl = 'http://localhost:8000/records'

export async function getRecords() {
    try {
        return await useFetch('/', {
            baseURL: baseUrl,
            method: 'GET',
            timeout: 5000,
        })
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error
    }
}