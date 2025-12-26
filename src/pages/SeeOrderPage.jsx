import { Link } from "react-router-dom";
import Button from "../components/Button";
import OrderContainer from "../features/orders/components/OrderContainer";
import useOrder from "../features/orders/hook/useOrder";
import useAuth from "../hook/useAuth";
import Spinner from "../components/Spinner";


export default function SeeOrderPage() {

    const { ordersByUser, loadingOrder } = useOrder()
    const { authUser } = useAuth()

    return (
        <>
            {loadingOrder && <Spinner transparent={true} />}
            {ordersByUser?.length && authUser?.id ? (
                <div className="mt-42 z-10 h-[25rem]  lg:h-[35rem] lg:mt-40  
            flex justify-start items-center flex-col gap-2   overflow-auto no-scrollbar">

                    <h1 className="font-extrabold text-4xl my-5 text-blue-900 b w-full p-5 text-center 
                    bg-white sticky -top-1">
                        {authUser.roleId === 1 ? "Your Order" : "All Order"}
                    </h1>

                    <OrderContainer orders={ordersByUser} />

                </div>
            )
                :

                (
                    <div className="mt-10 z-10 h-[35rem]  opacity-90  
            flex justify-center items-center flex-col rounded-2xl lg:bg-gray-200 lg:mt-32">
                        <div className="flex flex-col justify-center items-center">
                            <p className="mb-2">{authUser?.roleId === 1 ? "You don't have any orders yet." : " Don't have any orders yet."}</p>
                            <Link to={"/menu"}><Button bg="darkBlue">

                                {authUser?.roleId === 1 ? "Check here to choose menu." : " Click here to see menu"}
                            </Button></Link>
                        </div>
                    </div>
                )}

        </>
    )
}