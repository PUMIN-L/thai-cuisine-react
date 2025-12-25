import { Link, useLocation } from "react-router-dom"
import useAuth from "../hook/useAuth"
import { BasketIcon, CartIcon } from "../icons"

const menuList = [
    { id: 1, message: "HOME", to: "/" },
    { id: 2, message: "MENU", to: "/menu" },
    { id: 3, message: "CONTACT US", to: "/contactus" },
    { id: 4, message: "SEE ORDER", to: "/your-order" },
    { id: 6, message: "SETTING", to: "/setting" },
    { id: 5, message: <div className="w-8 m-0 p-0"><BasketIcon /></div>, to: "/orders" },

]

const menuListForUser = [
    { id: 1, message: "HOME", to: "/" },
    { id: 2, message: "MENU", to: "/menu" },
    { id: 3, message: "CONTACT US", to: "/contactus" },
    { id: 4, message: "SEE ORDER", to: "/your-order" },
    { id: 5, message: <div className="w-8 m-0 p-0"><BasketIcon /></div>, to: "/orders" },
]

export default function Menu() {

    const { pathname } = useLocation()

    const { authUser } = useAuth()



    const list = authUser?.roleId === 2 ? menuList : menuListForUser

    return (
        <nav className="flex flex-wrap w-full items-center justify-center-safe mt-2
        lg:justify-end lg:flex-row lg:mt-0">
            {list.map(el => {
                return <Link
                    key={el.id}
                    to={el.to}
                    className={`flex items-center ${pathname === el.to ? "" : "hover:bg-yellow-200"} 
                    ${pathname === el.to ? "text-amber-500" : "text-gray-500"} 
                    mx-3 p-1 rounded-lg font-bold`}
                >
                    {el.message}
                </Link>
            })}
        </nav>
    )
}