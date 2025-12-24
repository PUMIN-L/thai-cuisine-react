import { useRef, useState } from "react"
import Select from 'react-select'
import Input from "../../../components/Input"
import Avatar from "../../althentication/components/Avatar"
import blankImage from "../../../../src/assets/blankImage.png"
import Button from "../../../components/Button"
import { toast } from "react-toastify"
import useProduct from "../hook/useProduct"
import varidateCreateProductSchema from "../../althentication/varidator/validator-createProduct"
import Spinner from "../../../components/Spinner"
import { useNavigate } from "react-router-dom";

export default function AddMenuForm({ onSuccess }) {

    const fileEl = useRef()
    const navigate = useNavigate()
    const { createProduct, allProduct } = useProduct()



    const initialInput = {
        name: '',
        price: '',
        categoryName: '',
        description: '',
        number: '',
    }

    const initialInputError = {
        name: '',
        price: '',
        categoryName: '',
        description: '',
        number: ''
    }

    const [input, setInput] = useState(initialInput)
    const [inputError, setInputError] = useState(initialInputError)
    const [file, setFile] = useState('')
    const [loaging, setLoading] = useState(false)

    const handleChangeInput = e => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClickCreateProduct = async e => {
        try {
            e.preventDefault()
            setLoading(true)
            const error = varidateCreateProductSchema(input)

            if (error) {
                console.log(error)
                setInputError(error)
                return
            }

            setInputError({ ...initialInputError })

            const formData = new FormData()
            if (file) {
                formData.append('imageUrl', file)
            }

            for (const key in input) {
                formData.append(key, input[key])
            }

            await createProduct(formData)

            navigate('/menu')
            onSuccess()
            setLoading(false)
            toast.success("Created new menu")
            return true
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
        return true
    }

    const optionsFoodCategory = [
        { value: "soup", label: "soup" },
        { value: "curry", label: "curry" },
        { value: "stir-fry", label: "stir-fry" },
        { value: "dessert", label: "dessert" },
    ]

    const classNameP = "w-40 m-auto font-bold text-blue-800 "
    return (<div>
        {loaging && <Spinner transparent={true} />}
        <div className="pt-5">
            <div className="flex flex-col">
                <div className="flex mb-5">
                    <p className={classNameP}>Food Name :</p>
                    <Input
                        placeholder="Input Food name"
                        value={input.name}
                        name="name"
                        onChange={handleChangeInput}
                        error={inputError.name}
                    />
                </div>

                <div className="flex mb-5 ">
                    <p className={classNameP}>Food Price :</p>
                    <Input
                        placeholder="Input Food Price"
                        value={input.price}
                        name="price"
                        onChange={handleChangeInput}
                        error={inputError.price}
                    />
                </div>

                <div className="flex mb-5 ">
                    <p className={classNameP}>Food No. :</p>
                    <Input
                        placeholder="Input Food Number"
                        value={input.number}
                        name="number"
                        onChange={handleChangeInput}
                        error={inputError.number}
                    />
                </div>

                <div className="flex items-center">
                    <p className={` w-28  font-bold text-blue-800`}>category :</p>
                    <div>
                        <Select
                            options={optionsFoodCategory}
                            onChange={(e) => { setInput(prev => ({ ...prev, "categoryName": e.value })) }}
                            placeholder="Input category name"
                            classNamePrefix=".select-error__control"
                            className=" mt-2 "
                            error={inputError.categoryName}
                        />
                        {inputError.categoryName && (
                            <small className="text-red-500 text-sm ">
                                {inputError.categoryName}
                            </small>
                        )}
                    </div>

                </div>


                <div className="flex mb-5 flex-col gap-2 items-center">

                    <div className={`${classNameP} mt-5`}></div>

                    <input type="file" ref={fileEl}
                        className="hidden"
                        onChange={e => {
                            if (e.target.files[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                    />

                    <div className=" w-full ">
                        <div className="max-w-sm mx-auto">
                            <div className=" rounded-xl overflow-hidden shadow-lg cursor-pointer">
                                <Avatar
                                    src={file ? URL.createObjectURL(file) : blankImage}
                                    onClick={() => fileEl.current.click()}
                                    size={10}
                                    className={"w-full h-full object-contain "}
                                />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            <div className="text-center">
                <Button onClick={handleClickCreateProduct}>Create Product</Button>
            </div>
        </div>
    </div >

    )


}