
import { useEffect, useState } from "react";
import Select from 'react-select'
import Button from "../../../components/Button";
import OrderCard from "./OrderCard";
import orderItemApi from "../../../apis/orderItemApi";
import useAuth from "../../../hook/useAuth";
import { toast } from "react-toastify";
import useOrder from "../hook/useOrder";
import Modal from "../../../components/Modal";
import ConfirmDelete from "./ConfirmDelete";
import Spinner from "../../../components/Spinner";


export default function ShowOrderInformation({ order, onClose }) {

    const { authUser } = useAuth()
    const { updateOrder, deleteOrder } = useOrder()

    const [orderItems, setOrderItems] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [editValue, setEditValue] = useState({})
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getOrderItems = async () => {
            const orderItems = await orderItemApi.getByOrderId(order.id)
            setOrderItems(orderItems.data)
        }
        getOrderItems()

    }, [order])



    const optionsOrderStatus = [
        { value: "PROCESSING", label: "PROCESSING" },
        { value: "DELIVERED", label: "DELIVERED" },
        { value: "COMPLETED", label: "COMPLETED" },
        { value: "CANCELLED", label: "CANCELLED" },
        { value: "REFUNDED", label: "REFUNDED" },
    ]


    const optionsOrderPaynentStatus = [
        { value: "PENDING", label: "PENDING" },
        { value: "PAID", label: "PAID" },
        { value: "PAYMENT_FAILED", label: "PAYMENT_FAILED" },
        { value: "REFUNDED", label: "REFUNDED" },
    ]

    const findOption = (options, value) =>
        options.find(opt => opt.value === value) || null;

    const handalClickSave = async () => {
        try {
            if (Object.keys(editValue).length < 1) {
                setIsEdit(false)
                return toast.warn("No information was changed")
            }

            await updateOrder(order.id, editValue)

            setIsEdit(false)
            setEditValue({})
            toast.success("Information was updated")
            return true
        } catch (error) {
            console.log(error)
        }
    }


    const handalClickEdit = () => {
        setIsEdit(true)
    }

    const handalClickDelete = async () => {
        setOpenConfirmDelete(true)
    }

    const deleteFunction = async () => {
        try {
            setLoading(true)
            setOpenConfirmDelete(false)
            await deleteOrder(order.id)
            toast.success(`Deleted order number ${order.id}`)
            return true
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (<>
        {loading && <Spinner transparent={true} />}
        <div className="flex gap-8 bg-gray-900 rounded-lg pr-5 pb-10  flex-col lg:flex-row">
            <div className="flex flex-col max-h-80 justify-start items-start 
             overflow-auto scrollbar-custom min-w-[18rem]  lg:ml-5 lg:mt-5 ">
                {
                    orderItems && orderItems.map(item => <OrderCard key={item.id} information={item} />)
                }

            </div>
            <div className=" text-white w-[15rem] lg:pt-10  -mt-5 lg:mt-0">

                <h1 >Order number : <small className="text-orange-500 font-bold text-[1rem]">{order.orderNumber}</small></h1>

                <div className="flex items-center justify-start "><p className="min-w-26">Order status :</p> {isEdit ?
                    <Select
                        options={optionsOrderStatus}
                        value={findOption(optionsOrderStatus, editValue.orderStatus ?? order.orderStatus)}
                        onChange={(e) => {
                            setEditValue({ ...editValue, "orderStatus": e.value })
                        }}
                        classNamePrefix="my-select"
                        className="mb-2 mt-2 min-w-42"
                    />
                    : order.orderStatus}
                </div>


                <div className="flex gap-2 items-center justify-state ">
                    <p className="min-w-29">Payment status :</p> {isEdit ?
                        <Select
                            options={optionsOrderPaynentStatus}
                            value={findOption(optionsOrderPaynentStatus, editValue.paymentStatus ?? order.paymentStatus)}
                            onChange={(e) => {
                                setEditValue({ ...editValue, "paymentStatus": e.value })
                            }}
                            classNamePrefix="my-select"
                            className="min-w-40"
                        />
                        : order.paymentStatus}
                </div>
                <p className="mt-3 ">Total price : <span className="text-orange-500 font-bold">${order.totalPrice}</span></p>
                <div className="text-center mt-10">
                    <div className="flex flex-col gap-5 items-center lg:items-start">
                        {!isEdit && <Button width={40} bg="green" onClick={onClose}>Back</Button>}
                        {isEdit && <Button width={40} bg="red" onClick={() => setIsEdit(false)}>Back</Button>}
                        {authUser.roleId === 1 ? '' : <div className="flex flex-col gap-4">
                            {!isEdit && <Button width={40} bg="yellow" onClick={handalClickEdit}>Edit</Button>}
                            {isEdit && <Button width={40} bg="green" onClick={handalClickSave}>Save</Button>}
                            {!isEdit && <Button width={40} bg="red" onClick={handalClickDelete}>delete</Button>}
                            <Modal
                                onClose={() => setOpenConfirmDelete(false)}
                                open={openConfirmDelete}
                                title={`Confirm delete order  No.${order.orderNumber}`}
                            >
                                <ConfirmDelete
                                    deleteFunction={deleteFunction}
                                    clickCancle={setOpenConfirmDelete}
                                />
                            </Modal>
                        </div>
                        }

                    </div>

                </div>
            </div>

        </div>
    </>)
}