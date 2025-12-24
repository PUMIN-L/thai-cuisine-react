import { createContext, useEffect, useState } from "react";
import orderApi from "../../../apis/orderApi";
import useAuth from "../../../hook/useAuth";

export const OrderContext = createContext()

export default function OrderContextProvider({ children }) {

    const { authUser } = useAuth()

    const [ordersByUser, setOrdersByUser] = useState([])

    const [createOrder, setCreateOrder] = useState([])
    const [loadingOrder, setLoadingOrder] = useState(true)


    useEffect(() => {

        if (!authUser) {
            setLoadingOrder(false)
            return setOrdersByUser([])
        }

        if (authUser.roleId === 1) {

            const getOrders = async () => {
                setLoadingOrder(true)
                const orders = await orderApi.getAllByUserId()
                if (orders) {
                    setOrdersByUser(orders.data)
                }
                setLoadingOrder(false)
            }
            getOrders()
        }

        if (authUser.roleId === 2) {
            const getOrders = async () => {
                setLoadingOrder(true)
                const orders = await orderApi.getAllForAdmin()
                if (orders) {

                    setOrdersByUser(orders.data)
                }
                setLoadingOrder(false)
            }

            getOrders()
        }



    }, [authUser])

    const getAllOrdersByUserId = async () => {
        try {
            const orders = await orderApi.getAllByUserId()
            return orders
        } catch (error) {
            console.log(error)
        }

    }

    const updateOrder = async (orderId, body) => {
        try {
            const res = await orderApi.update(orderId, body)
            const takeThisOrderOutFirst = ordersByUser.filter(item => item.id !== orderId)
            setOrdersByUser([res.data, ...takeThisOrderOutFirst])
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const deleteOrder = async orderId => {
        try {
            await orderApi.delete(orderId)
            const afterDelete = ordersByUser.filter(item => item.id !== orderId)
            setOrdersByUser(afterDelete)
        } catch (error) {
            console.log(error)
        }
    }

    const value = {
        setCreateOrder,
        createOrder,
        getAllOrdersByUserId,
        ordersByUser,
        setOrdersByUser,
        loadingOrder,
        updateOrder,
        deleteOrder
    }

    return <OrderContext.Provider value={value}>
        {children}
    </OrderContext.Provider>


}