import { isAuth } from '@/services/admission'
import { userDataStore } from '@/stores/userStore'

const store = userDataStore()

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const tokenObj = {
      'token': store.token
    }

    const { data } = await isAuth(tokenObj)
    if (data) {
      if (!data.value.success) {
        store.$reset()
        return navigateTo('/login')
      }
      else {
        if (to.path == '/login') {
          return navigateTo('/')
        }
      }
    }
    else{
      return navigateTo('/login')
    }


  } catch (e) {
    console.log(e)
    return navigateTo('/')
  }


})