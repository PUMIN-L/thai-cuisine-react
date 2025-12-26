import { useEffect, useState } from "react"
import useAuth from "../hook/useAuth"
import Avatar from "../features/althentication/components/Avatar"
import Modal from "../components/Modal"
import RegisterForm from "../features/althentication/components/RegisterForm"
import LoginForm from "../features/althentication/components/LoginForm"
import DropDown from "./DropDown"

export default function MenuLogin() {

    const { authUser, logout } = useAuth()

    const [openLogin, setOpenLogin] = useState(false)
    const [openRegisterForm, setOpenRegisterForm] = useState(false)


    return (
        <div className='flex justify-end  gap-2 items-center mb-3 '>
            ({authUser ? <>
                <div className="mr-2">
                    <div className="mt-0.5">
                        <DropDown
                            username={authUser?.username}
                            logout={logout}
                        />
                    </div>

                </div>
                <Avatar src={authUser?.picture} size="3.5" className="lg:hidden rounded-full" />
                <Avatar src={authUser?.picture} size="4" className={"hidden lg:block lg:rounded-full"} />

            </>
                : (<div className='flex gap-5 mr-2'>
                    <p
                        className='font-bold text-amber-500 text-x cursor-pointer'
                        onClick={() => setOpenLogin(prev => !prev)}
                    >Login</p>

                    <Modal
                        open={openLogin}
                        onClose={() => setOpenLogin(false)}
                        title={"Login"}>
                        <LoginForm onSuccess={() => setOpenLogin(false)} />
                    </Modal>
                    <p
                        className='font-bold text-amber-500 text-x cursor-pointer'
                        onClick={() => setOpenRegisterForm(prev => !prev)}
                    >Register</p>
                    <Modal
                        open={openRegisterForm}
                        onClose={() => setOpenRegisterForm(false)}
                        title="Register Form"

                    >

                        <RegisterForm onSuccess={() => setOpenRegisterForm(false)} />
                    </Modal>
                </div>)})



        </div>
    )
}