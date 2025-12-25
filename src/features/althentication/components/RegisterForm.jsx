import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import validateRegister from "../varidator/validator-register";
import { toast } from 'react-toastify'
import authApi from "../../../apis/auth";
import { AxiosError } from "axios";
import Spinner from "../../../components/Spinner";

const initialInput = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 1
}

const initialInputError = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: 1
}


export default function RegisterForm({ onSuccess }) {


    const [input, setInput] = useState(initialInput)
    const [inputError, setInputError] = useState(initialInputError)
    const [loading, setLoading] = useState(false)

    const handleChangeInput = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClickSubmit = async e => {
        try {
            e.preventDefault()
            setLoading(true)
            const error = validateRegister(input)

            if (error) {
                setInputError(error)
                return
            }
            setInputError({ ...initialInputError })

            await authApi.register(input)

            onSuccess()
            toast.success('Registration completed successfully.');
            return true
        } catch (error) {

            console.log(error)

            if (error instanceof AxiosError) {

                if (error.response.data.field === "username") {

                    setInputError(prev => ({ ...prev, username: "Username already in use" }))
                }
                if (error.response.data.field === 'email') {
                    setInputError(prev => ({ ...prev, email: "Email already in use" }))
                }
            }
        } finally {
            setLoading(false)
        }

        return true

    }

    const classNameP = "flex justify-end w-65 m-auto font-bold text-blue-800 mr-5 hidden lg:block"
    const classNamePForPhone = "w-[15rem]  m-auto font-bold text-blue-800 lg:hidden"

    return (<>
        {loading && <Spinner transparent={true} />}
        <form onSubmit={handleClickSubmit} autoComplete="off">
            <div className="mt-5 flex flex-col">

                <div className="flex mb-5">
                    <p className={classNameP}>Username :</p>
                    <Input
                        placeholder="Input your username"
                        value={input.username}
                        name="username"
                        onChange={handleChangeInput}
                        error={inputError.username}
                    />
                </div>

                <div className="flex mb-5">
                    <p className={classNameP}>Email :</p>
                    <Input
                        placeholder="Input your email"
                        value={input.email}
                        name="email"
                        onChange={handleChangeInput}
                        error={inputError.email}
                        type={"text"}
                    />
                </div>

                <div className="flex mb-5">
                    <p className={classNameP}>Password :</p>
                    <Input
                        placeholder="Input your password"
                        value={input.password}
                        name="password"
                        onChange={handleChangeInput}
                        error={inputError.password}
                        type={"password"}
                    />
                </div>


                <div className="flex mb-5">
                    <p className={classNameP}>Confirm Password :</p>
                    <Input
                        placeholder="Input confirm Password"
                        value={input.confirmPassword}
                        name="confirmPassword"
                        onChange={handleChangeInput}
                        error={inputError.confirmPassword}
                        type={"password"}
                    />
                </div>
                <Button >Submit</Button>

            </div>
        </form>
    </>)
}