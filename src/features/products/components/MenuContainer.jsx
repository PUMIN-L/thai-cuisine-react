
import FoodCardContainer from "./FoodCardContainer"
import ShowCategory from "./ShowCategory"


export default function MenuContainer() {
    return (
        <div className="flex mt-33  h-[25rem] justify-center  xl:h-[35rem] ">
            <ShowCategory />
            <FoodCardContainer />
        </div>
    )
}