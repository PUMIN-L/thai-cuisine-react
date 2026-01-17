import { createContext, useEffect, useState } from "react"
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken
} from "../../utils/local-storage"
import authApi from "../apis/auth"
import { toast } from "react-toastify"
import useOrder from "../features/orders/hook/useOrder"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null)
  const [isUserLoading, setIsUserLoading] = useState(true)

  useEffect(() => {
    setIsUserLoading(true)
    const fetcUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser()
          setAuthUser(res.data.user)
        }
      } catch (error) {
        console.log(error)
      } finally {
        setIsUserLoading(false)
      }
    }
    fetcUser()
  }, [])

  const login = async (credentials) => {
    const res = await authApi.login(credentials)
    setAccessToken(res.data.accessToken)
    const resGetAuthUser = await authApi.getAuthUser()
    setAuthUser(resGetAuthUser.data.user)
  }

  const logout = () => {
    removeAccessToken()
    setAuthUser(null)
    toast.success("Sign out completed.")
  }

  const updateAuthUserProfilePicture = async (fromData) => {
    const res = await authApi.uploadUserImage(fromData)
    setAuthUser((prev) => ({ ...prev, ...res.data }))
  }

  const value = {
    login,
    logout,
    authUser,
    isUserLoading,
    updateAuthUserProfilePicture
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
