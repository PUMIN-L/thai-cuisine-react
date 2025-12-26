
import FoodCardContainer from "./FoodCardContainer"
import ShowCategory from "./ShowCategory"


export default function MenuContainer() {

    return (
        <div className="flex flex-col mt-33 justify-center 
         lg:flex-row 
         "
        >
            <ShowCategory />
            <FoodCardContainer />
        </div>
    )
}