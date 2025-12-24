
import thaiFood from "../assets/thaiFood.jpg"


export default function FoodCard({ src, name, price, id, onClick, number }) {


    return (
        <>
            <div className="w-60 h-45 overflow-hidden rounded-lg cursor-pointer 
            active:scale-95 bg-black shrink-0 shadow"
                onClick={onClick}
            >
                <div className="w-full h-35 bg-white object-cover overflow-hidden flex justify-center items-center">
                    <img src={src || thaiFood} alt="Food picture" />
                </div>
                <div className="flex justify-between p-2 px-4 font-bold ">
                    <p className="text-white"> No.{number} </p>
                    <p className="text-white"> {name} </p>
                    <p className="text-orange-400">${price}</p>
                </div>

            </div>

        </>
    )
}