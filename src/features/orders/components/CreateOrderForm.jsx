import { toast } from "react-toastify";
import Button from "../../../components/Button";
import useOrder from "../hook/useOrder";
import ItemOrderCard from "./ItemOrderCard";
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import useAuth from "../../../hook/useAuth";
import orderApi from "../../../apis/orderApi";
import orderItemApi from "../../../apis/orderItemApi";
import Spinner from "../../../components/Spinner";

export default function CreateOrderForm() {

    const navigate = useNavigate()

    const { authUser } = useAuth()

    const { createOrder, setCreateOrder, setOrdersByUser, ordersByUser } = useOrder()

    const orderInit = {
        userId: authUser?.id,
        totalPrice: 0,
        orderStatus: 'PROCESSING',
        paymentStatus: 'PENDING',
    }

    const [order, setOrder] = useState(orderInit)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const newTotalPrice = () => {
            let totalPrice = 0
            createOrder.map(item => {
                totalPrice += (item.price * item.amount)
            })
            setOrder({ ...order, "totalPrice": totalPrice })
        }

        newTotalPrice()
    }, [createOrder])

    const handleClickOrderNow = async () => {
        try {

            if (!authUser) {
                return toast.warn('Please sign in before you can place an order.')
            }

            if (!paymentMethod) {
                return toast.warn('Please select a payment method')
            }
            setLoading(true)
            const resCreateOrder = await orderApi.create(order)

            if (resCreateOrder) {
                setOrdersByUser([resCreateOrder.data, ...ordersByUser])
                const orderItems = createOrder.reduce((itemOrder, item) => {
                    const formObject = {
                        "orderId": resCreateOrder.data.id,
                        "productId": item.id,
                        "amount": item.amount,
                        "price": item.price * item.amount
                    }
                    return [...itemOrder, formObject]
                }, [])

                for (const item in orderItems) {
                    await orderItemApi.create(orderItems[item])
                }
            }
            toast.success('Created Order')
            setCreateOrder([])
            navigate('/your-order')
            return true
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }

    const handleClickCancleOrder = () => {
        setCreateOrder([])
        toast.success('Deleted Order')
    }

    return (<>
        {loading && <Spinner transparent={true} />}
        {
            createOrder[0] ? (<div className="flex flex-col-reverse shadow-lg rounded-lg w-full mt-60 h-[90vh]
         lg:flex-row lg:h-[20rem] lg:w-auto lg:mt-0 bg-gray-200 lg:bg-white"
            >
                <div className="overflow-auto px-3 h-[50vh] lg:mt-0 lg:mt-2 lg:ml-3 lg:max-h-none ">
                    {createOrder.map(e => {
                        return <ItemOrderCard information={e} key={e.id} />
                    })}
                </div>

                <div className=" overflow-auto px-10 mt-5 lg:mt-2 ">

                    <div className="flex gap-2 lg:text-lg">
                        <p className="font-bold">Totle Prict</p>
                        <p>${order.totalPrice}</p>
                    </div>
                    <div className="mt-2 lg:text-lg">
                        <p className="font-bold">Choose a payment method</p>
                        <label>
                            <input type="radio" name="payment" value="bank"
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            Transfer from a bank account
                        </label>
                        <br />

                        <label>
                            <input type="radio" name="payment" value="cash"
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            Pay with cash on delivery
                        </label>
                        <br />

                    </div>
                    <div className="flex gap-5 mt-5 justify-center text-[0.9rem] pb-5 lg:text-[1.1rem] lg:pb-0">
                        <Button bg="green" onClick={handleClickOrderNow} >Order now</Button>
                        <Button bg="red" onClick={handleClickCancleOrder} >Cancle order</Button>
                    </div>
                </div>
            </div>) : (<div className="flex flex-col justify-center items-center">
                <p className="mb-2">You haven't added any menu yet</p>
                <Link to={"/menu"}><Button>Check here to choose menu.</Button></Link>
            </div>)
        }
    </>)
}