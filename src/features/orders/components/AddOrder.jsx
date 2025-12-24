import { useEffect, useState } from "react"
import Button from "../../../components/Button"
import useOrder from "../hook/useOrder"
import { toast } from "react-toastify"
import EditAmountOrder from "./EditAmountOrder"
import thaiFood from "../../../assets/thaiFood.jpg"

export default function AddOrder({ e, onClose }) {

    const { setCreateOrder, createOrder } = useOrder()

    const [amount, setAmount] = useState(1)
    const [resetButton, setResetButton] = useState(false)



    const isAlreadyHaveItem = createOrder.filter(item => item.id === e.id)

    useEffect(() => {

        if (isAlreadyHaveItem[0]) {
            setAmount(isAlreadyHaveItem[0].amount)
        }

    }, [])

    useEffect(() => {
        if (amount === 0 && isAlreadyHaveItem[0]) {
            setResetButton(true)
        }
    }, [amount])


    const handleClickCancle = () => {
        onClose()
    }


    const handleClickAddOrder = () => {

        if (amount !== 0) {
            const isAlreadyHaveAmount = createOrder.filter(item => item.id === e.id)

            if (isAlreadyHaveAmount[0]) {
                const takeItem = createOrder.filter(item => item.id !== e.id)
                setCreateOrder(takeItem)
            }
            const item = { ...e, amount }
            setCreateOrder(prev => [item, ...prev])

            onClose()
        }

        if (amount === 0) {
            toast.error('You must order at least 1 item.')
        }

    }

    const handleClickRemoveThisFood = () => {
        const afterDelete = createOrder.filter(item => item.id !== e.id)
        setCreateOrder(afterDelete)
        onClose()
    }

    return (<>
        <div className="flex justify-center items-center gap-6 mt-2">
            <div className="h-15 w-15">
                <img src={e?.imageUrl || thaiFood} alt="food image"
                    className="w-full h-full object-cover  rounded-2xl" />
            </div>

            <div>
                <div className="flex gap-2 font-bold">
                    <p>No.{e?.id}</p>
                    <p>{e?.name}</p>
                </div>
                <div className="font-bold">
                    Price: {e?.price}
                </div>
            </div>

            <EditAmountOrder amount={amount} setAmount={setAmount} />

        </div>

        <div className="flex gap-10  mt-3 justify-center">
            {!resetButton && <Button bg="green" onClick={handleClickAddOrder}>Add Order</Button>}
            {resetButton && <Button bg="blue" onClick={handleClickRemoveThisFood}>Remove this food</Button>}
            <Button bg="red" onClick={handleClickCancle}>Cencle</Button>
        </div>

    </>)
}