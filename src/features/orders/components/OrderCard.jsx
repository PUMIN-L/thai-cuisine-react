import { useEffect, useState } from "react"
import productApi from "../../../apis/productApi"
import Spinner from "../../../components/Spinner"
import foodPicture from "../../../assets/thaiFood.jpg"


export default function OrderCard({ information }) {

    const [product, setProduct] = useState(null)
    const [loaging, setLoading] = useState(false)

    useEffect(() => {
        const getProduct = async id => {
            setLoading(true)
            const res = await productApi.getById(id)
            setProduct(res.data)
        }
        getProduct(information.productId)
        setLoading(false)
    }, [])

    return (<>
        {loaging && <Spinner transparent={true} />}
        <div className="flex justify-center items-center gap-6 p-2 px-4 pl-5  bg-gray-900  rounded-lg">
            {<div className="h-15 w-15">
                <img src={product?.imageUrl || foodPicture} alt="food image" className="w-full h-full object-cover border-2  rounded-2xl" />
            </div>}

            <div className="ml-[-1rem] flex flex-col flex-1">
                <div className="flex gap-2 text-white ">
                    <p>No.{product?.number}</p>
                    <p>{product?.name}</p>
                </div>
                <div className="flex gap-2 text-white  ">
                    <div className="cursor-pointer  gap-2 ">
                        <p className=" rounded no-spinner w-full" >
                            {information.amount} &times; {information.price} = ${information.amount * information.price}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </>)


}