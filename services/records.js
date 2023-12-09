const URL = 'http://192.168.0.133:8000' + '/records'

export async function getRecords(datas = null) {
    try {
        return await useFetch('/', {
            baseURL: URL,
            method: 'GET',
            timeout: 5000,
            params: datas
        })
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error
    }
}

export async function getRecordsInfo(datas = null) {
    try {
        return await useFetch('/info', {
            baseURL: URL,
            method: 'GET',
            timeout: 5000,
            params: datas
        })
    } catch (error) {
        console.error('Error fetching records:', error);
        throw error
    }
}