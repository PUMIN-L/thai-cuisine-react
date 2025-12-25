
import FoodCardContainer from "./FoodCardContainer"
import ShowCategory from "./ShowCategory"


export default function MenuContainer() {
    return (
        <div className="flex flex-col mt-33 justify-center 
        lg:h-[25rem] lg:flex-row 
        xl:h-[35rem] "
        >
            <ShowCategory />
            <FoodCardContainer />
        </div>
    )
}