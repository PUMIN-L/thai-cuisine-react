import { useEffect, useState } from "react"
import EditAmountOrder from "./EditAmountOrder"
import useOrder from "../hook/useOrder"
import Button from "../../../components/Button"
import thaiFood from "../../../assets/thaiFood.jpg"

export default function ItemOrderCard({ information }) {

    const { setCreateOrder, createOrder } = useOrder()

    const [amount, setAmount] = useState(information.amount)
    const [openRemoveButton, setOpenRemoveButton] = useState(false)



    useEffect(() => {
        const handleChangeAmount = () => {
            const EditAmountOrders = createOrder.map(item => {
                return item.id === information.id
                    ? { ...item, amount } : item
            })

            setCreateOrder(EditAmountOrders)
        }
        handleChangeAmount()

        if (amount === 0) {
            setOpenRemoveButton(true)
        }

    }, [amount])

    const handleClickCancal = () => {
        setAmount(1)
        setOpenRemoveButton(false)
    }

    const handleClickRemove = () => {
        const newOrders = createOrder.filter(item => item.id !== information.id)

        setCreateOrder(newOrders)
    }


    return (<>

        <div className="flex justify-center items-center gap-6 mt-2  p-2 shadow-lg rounded-lg bg-gray-900 ">
            <div className="h-15 w-15 mx-3">
                <img src={information.imageUrl || thaiFood} alt="food image" className="w-full h-full object-cover border-2  rounded-2xl" />
            </div>

            <div className="ml-[-1rem] flex flex-col flex-1">
                <div className="flex gap-2 font-bold text-white ">
                    <p>No.{information.id}</p>
                    <p>{information.name}</p>
                </div>
                <div className="font-bold text-orange-400 flex gap-1 ">
                    <p className="text-white">Price:</p> ${information.price}
                </div>
            </div>

            <div className="flex justify-center items-center gap-2 text-white  ">
                {!openRemoveButton ? <EditAmountOrder amount={amount} setAmount={setAmount} /> :
                    <div className="flex gap-2">
                        <Button bg="red" onClick={handleClickRemove}>Remove this menu</Button>
                        <Button bg="green" onClick={handleClickCancal}>Cancle</Button>
                    </div>
                }

            </div>
        </div>
    </>)
}