import Header from "./Header";
import { Outlet } from "react-router-dom"

export default function MainContainer() {
    return (
        <>
            <div className="flex flex-col">
                <Header />

                <div className="mx-10 my-5">
                    <Outlet />
                </div>
            </div>


        </>
    )
}