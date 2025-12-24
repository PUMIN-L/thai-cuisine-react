const ACESS_TOKEN = "ACESS_TOKEN"

export const setAccessToken = token => localStorage.setItem(ACESS_TOKEN, token)
export const getAccessToken = () => localStorage.getItem(ACESS_TOKEN)
export const removeAccessToken = () => localStorage.removeItem(ACESS_TOKEN)