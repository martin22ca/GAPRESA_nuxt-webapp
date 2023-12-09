export const userDataStore = defineStore('userData', () => {
    const id = ref(0)
    const token = ref('')
    const name = ref('X')

    function $reset() {
        id.value = 0
        token.value = ''
        name.value = 'X' 
      }

    return { id, name, token, $reset}
})