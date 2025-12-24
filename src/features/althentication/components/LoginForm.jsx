import { useState } from "react"
import Input from "../../../components/Input"
import Button from "../../../components/Button"
import { toast } from "react-toastify"
import validateLogin from "../varidator/validator-login"
import useAuth from "../../../hook/useAuth"
import { AxiosError } from "axios"
import { useNavigate } from "react-router-dom"
import Spinner from "../../../components/Spinner"


const initialInput = {
    usernameOrEmail: '',
    password: '',
}

const initialInputError = {
    usernameOrEmail: '',
    password: ''
}

export default function LoginForm({ onSuccess }) {

    const [input, setInput] = useState(initialInput)
    const [inputError, setInputError] = useState(initialInputError)
    const [loading, setLoading] = useState(false)

    const { login } = useAuth()

    const navigate = useNavigate()

    const handleChangeInput = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClickSubmit = async e => {
        try {
            e.preventDefault()
            setLoading(true)
            const error = validateLogin(input)

            if (error) {
                setInputError(error)
                return
            }

            setInputError({ ...initialInputError })

            await login(input)
            navigate('/menu')
            onSuccess()
            toast.success('Registration completed successfully.');
            return true
        } catch (error) {

            console.log(error)

            if (error instanceof AxiosError) {
                if (error.response.data.field === 'usernameOrEmail') {
                    setInputError(prev => ({ ...prev, usernameOrEmail: "Username or Email is not correct" }))
                }
            }

            if (error instanceof AxiosError) {
                if (error.response.data.field === 'password') {
                    setInputError(prev => ({ ...prev, password: "Password is not correct" }))
                }
            }
        } finally {
            setLoading(false)
        }

    }

    const classNameP = "w-[15rem]  m-auto font-bold text-blue-800"

    return (
        <>
            {loading && <Spinner transparent={true} />}
            <form onSubmit={handleClickSubmit} autoComplete="off">
                <div className="mt-5 flex flex-col w-[30rem] ">
                    <div className="flex mb-5 ">
                        <p className={classNameP}>Username or Email :</p>
                        <Input
                            placeholder="Input your username or Email "
                            value={input.usernameOrEmail}
                            name="usernameOrEmail"
                            onChange={handleChangeInput}
                            error={inputError.usernameOrEmail}
                        />
                    </div>
                    <div className="flex mb-7">
                        <p className={classNameP}>Password :</p>
                        <Input
                            placeholder="Input password"
                            value={input.password}
                            name="password"
                            onChange={handleChangeInput}
                            error={inputError.password}
                            type={"password"}
                        />
                    </div>

                    <Button>Login</Button>

                </div>

            </form>
        </>
    )
}