const URL = 'http://192.168.0.133:8000' + '/providers'

export async function getProviders(datas = null) {
    try {

        return await useFetch('/', {
            baseURL: URL,
            method: 'GET',
            timeout: 5000,
            params: datas})
         
    } catch (error) {
        console.error('Error fetching providers:', error);
        throw error
    }
}