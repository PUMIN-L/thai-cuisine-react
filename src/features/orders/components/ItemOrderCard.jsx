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

        <div className="flex  justify-center items-center mt-2 p-2 shadow-lg rounded-lg bg-gray-900 relative
lg:gap-6 
        ">
            <div className="h-15 w-15  
            lg:h-15 lg:w-15 lg:mr-2">
                <img src={information.imageUrl || thaiFood} alt="food image" className="w-full h-full object-cover border-2  rounded-2xl" />
            </div>

            <div className="ml-4 flex flex-col flex-1 gap-2 
            lg:ml-[-1rem] lg:gap-0">
                <div className="flex gap-2 font-bold text-white ">
                    <p>No.{information.number}</p>
                    <p>{information.name}</p>
                </div>
                <div className="font-bold text-orange-400 flex gap-1">
                    <p className="text-white">Price:</p> ${information.price}
                </div>
            </div>


            <div className="flex justify-center items-center  text-white lg:hidden ">
                {!openRemoveButton ? <EditAmountOrder amount={amount} setAmount={setAmount} /> :
                    <div className="flex gap-1 text-[0.8rem] absolute top-9 left-44">
                        <Button bg="red" px="1" onClick={handleClickRemove}>Remove</Button>
                        <Button bg="green" px="1" onClick={handleClickCancal}>Cancle</Button>
                    </div>
                }

            </div>


            <div className="flex justify-center items-center gap-2 text-white hidden lg:block  ">
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