import Spinner from "../../../components/Spinner"
import useAuth from "../../../hook/useAuth"


export default function ProtectedRoute({ children }) {
    const { isUserLoading } = useAuth()
    return (
        <>
            {isUserLoading && <Spinner />}
            {children}
        </>
    )


}