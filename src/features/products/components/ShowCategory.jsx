import { Link, useLocation } from "react-router-dom"

export default function ShowCategory() {

    const location = useLocation();
    const path = location.search ? `${location.pathname}${location.search}`
        : `${location.pathname}${location.search}/?categorie=all`

    const category = [
        { id: 1, message: "ALL FOOD", to: "/menu/?categorie=all" },
        { id: 2, message: "SOUP", to: "/menu/?categorie=soup" },
        { id: 3, message: "CURRY", to: "/menu/?categorie=curry" },
        { id: 4, message: "STIR-FRY", to: "/menu/?categorie=stir-fry" },
        { id: 5, message: "DESSERT", to: "/menu/?categorie=dessert" },
    ]

    return (<>
        <aside className="sticky top-43 bg-black opacity-90 
                 rounded-2xl text-gray-800 p-5 h-full overflow-auto w-full my-5
                lg:w-64 lg:mx-10 lg:my-0 lg:top-44 lg:bg-gray-100">
            <h1 className="text-2xl font-bold mb-6 hidden lg:block">CATEGORY</h1>
            <ul className=" text-xl font-bold flex flex-wrap justify-center gap-5
             lg:block lg:space-y-4">
                {category.map(el => {
                    return <li key={el.id}>
                        <Link
                            key={el.id}
                            to={el.to}
                            className={`${path === el.to ? "" : "hover:bg-yellow-200"} 
                    ${path === el.to ? "text-amber-500" : "text-gray-500"} 
                     rounded-lg font-bold
                     lg:mx-3 lg:p-2`}
                        >
                            {el.message}
                        </Link>
                    </li>
                })}
            </ul>
        </aside>
    </>)
}