import Spinner from "../../../components/Spinner"
import useAuth from "../../../hook/useAuth"
import { Navigate } from "react-router-dom";

export default function ProtectedRouteIsAdmin({ children }) {
    const { authUser, isUserLoading } = useAuth()

    if (!authUser && !isUserLoading) {
        return <Navigate to="/menu" />
    }

    if (authUser && !isUserLoading) {
        if (authUser.roleId !== 2) {
            return <Navigate to="/menu" />
        }
    }


    return (
        <>
            {isUserLoading && <Spinner />}
            {children}
        </>
    )


}