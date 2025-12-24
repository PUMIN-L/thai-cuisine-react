import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Homepage() {
    return (
        <div className=" mt-36 z-10 h-[24rem] opacity-90 flex justify-center items-center 
         xl:h-[32rem] relative ">
            <div className=" absolute inset-0  overflow-hidden opacity-90  w-full  rounded-2xl">
                <img
                    src="https://res.cloudinary.com/dtbfee3ql/image/upload/v1717065268/samples/food/fish-vegetables.jpg"
                    alt="Food picture"
                    className="rounded-2xl h-full w-full  object-cover"
                />
            </div>

            <Link to={"/menu"} className="z-30  rounded-xl font-bold text-xl"> <Button bg="darkBlue" width="40"
                height="15"
            >Order Now !!</Button></Link>
        </div>
    )
}