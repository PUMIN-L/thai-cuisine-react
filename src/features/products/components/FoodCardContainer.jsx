import { useState } from "react"
import FoodCard from "../../../components/FoodCard"
import Modal from "../../../components/Modal"
import useProduct from "../hook/useProduct"
import AddOrder from "../../orders/components/AddOrder"
import { Link, useSearchParams } from "react-router-dom"
import useOrder from "../../orders/hook/useOrder"
import { BasketIcon } from "../../../icons"



export default function FoodCardContainer() {

    const [searchParams] = useSearchParams();
    const categorie = searchParams.get("categorie");

    const { allProduct } = useProduct()
    const { createOrder } = useOrder()
    const [chooseMenu, setChooseMenu] = useState(false)

    return (
        <>
            <main className=" overflow-auto  w-[52rem] h-full  bg-gray-100 rounded-2xl ">
                {createOrder[0] ? <div className="flex justify-start ">
                    <Link to={'/orders'}>
                        <p
                            className=" mt-5 text-end  max-w-46  ml-11 font-bold text-blue-900 cursor-pointer 
                        hover:underline hover:underline-offset-2 \">
                            <div className="flex  justify-center items-center  gap-1">
                                Go to your basket →<div className="w-6 m-0 p-0"><BasketIcon /></div>
                            </div>

                        </p>
                    </Link>
                </div> : <p
                    className="pt-3 ml-11 font-bold text-black ">
                    Click on food picture for Ass order.
                </p>}



                <div className="space-y-4 mt-3 flex justify-start gap-2 flex-wrap ">

                    {allProduct?.map(e => {
                        if (e.id !== 0) {

                            if (e.categoryName === categorie || categorie === 'all' || categorie === null)
                                return <FoodCard
                                    key={e.id}
                                    src={e.imageUrl}
                                    name={e.name}
                                    price={e.price}
                                    id={e.id}
                                    number={e.number}
                                    onClick={() => setChooseMenu(e)}

                                />
                        }
                    })}
                </div>

                <Modal
                    open={!!chooseMenu}
                    onClose={() => setChooseMenu(false)}
                    title={"Add order"}
                >
                    <AddOrder
                        e={chooseMenu}
                        onClose={() => setChooseMenu(false)}
                    />
                </Modal>

                {createOrder[0] ?
                    <div className="flex justify-end ">
                        <Link to={'/orders'}>
                            <p
                                className="pb-5 mr-5 text-end  max-w-46  ml-11 font-bold text-blue-900 cursor-pointer 
                        hover:underline hover:underline-offset-2 \">
                                <div className="flex  justify-center items-center  gap-1">
                                    Go to your basket →<div className="w-6 m-0 p-0"><BasketIcon /></div>
                                </div>

                            </p>
                        </Link>
                    </div>

                    : <p
                        className="pb-5 ml-11 font-bold text-black text-end mr-5 ">
                        Click on food picture for Ass order.
                    </p>}
            </main>
        </>
    )
}