import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import ShowOrderInformation from "../components/ShowOrderInformation"

export default function ShotcutOrderCard({ order }) {

    const [openModal, setOpenModal] = useState(false)

    const handleOnClickSeeOrder = () => {
        setOpenModal(true)
    }

    return (<>
        <div className="flex flex-col gap-5 bg-gray-900 p-5 rounded-lg  
        text-white w-70 lg:w-full lg:flex-row ">
            <div>
                <div>Order id : <span className="text-blue-400 font-bold">{order.id}</span></div>
                <div className="min-w-32">Total price : <span className="text-orange-400 font-bold">{order.totalPrice}</span></div>
            </div>
            <div className="min-w-63 ">
                <p>Order status : {order.orderStatus}</p>
                <p>Payment status : {order.paymentStatus}</p>
            </div>

            <Button bg="green" onClick={handleOnClickSeeOrder}>See Order</Button>


        </div >

        <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            bg='gray900'
            title={`Order number : ${order.id}`}
            textColor='white'

        >
            <ShowOrderInformation order={order} onClose={() => setOpenModal(false)} />
        </Modal>


    </>)
}