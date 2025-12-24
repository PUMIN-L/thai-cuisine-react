import { Link, useLocation } from "react-router-dom"

export default function ShowCategory() {

    const location = useLocation();
    const path = `${location.pathname}${location.search}`

    const category = [
        { id: 1, message: "ALL", to: "/menu/?categorie=all" },
        { id: 2, message: "SOUP", to: "/menu/?categorie=soup" },
        { id: 3, message: "CURRY", to: "/menu/?categorie=curry" },
        { id: 4, message: "STIR-FRY", to: "/menu/?categorie=stir-fry" },
        { id: 5, message: "DESSERT", to: "/menu/?categorie=dessert" },
    ]

    return (<>
        <aside className=" w-64 sticky top-32  mx-10 
                bg-gray-100 rounded-2xl text-gray-800 p-5 h-full overflow-auto">
            <h1 className="text-2xl font-bold mb-6">CATEGORY</h1>
            <ul className="space-y-4 text-xl font-bold   ">
                {category.map(el => {
                    return <li key={el.id}>
                        <Link
                            key={el.id}
                            to={el.to}
                            className={`${path === el.to ? "" : "hover:bg-yellow-200"} 
                    ${path === el.to ? "text-amber-500" : "text-gray-500"} 
                    mx-3 p-2 rounded-lg font-bold`}
                        >
                            {el.message}
                        </Link>
                    </li>
                })}
            </ul>
        </aside>
    </>)
}