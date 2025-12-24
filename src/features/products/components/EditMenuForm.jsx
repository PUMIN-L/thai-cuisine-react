import { useEffect, useRef, useState } from "react"
import Input from "../../../components/Input"
import Avatar from "../../althentication/components/Avatar"
import blankImage from "../../../../src/assets/blankImage.png"
import Button from "../../../components/Button"
import { toast } from "react-toastify"
import useProduct from "../hook/useProduct"
import Spinner from "../../../components/Spinner"
import { useNavigate, useSearchParams } from "react-router-dom";
import varidateUpdateProductSchema from "../../althentication/varidator/validator-updateProduct"

const initialInputError = {
    name: '',
    price: '',
    categoryName: '',
    description: '',
}

export default function EditMenuForm({ onSuccess, backToSelectForm }) {

    const navigate = useNavigate()

    const fileEl = useRef()
    const {
        updateProduct,
        selectedForEdit,
        setSelectedForEditAfterSuccess } = useProduct()

    const [product, setProduct] = useState(selectedForEdit)
    const [inputError, setInputError] = useState(initialInputError)
    const [file, setFile] = useState(null)
    const [loaging, setLoading] = useState(false)

    const handleChangeInput = e => {
        setProduct(prev => ({ ...prev, [e.target.name]: String(e.target.value) }))
    }

    const handleClickSave = async e => {
        try {
            e.preventDefault()
            console.log("product web", product)
            const error = varidateUpdateProductSchema(product)

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

            for (const key in product) {
                if (key === 'name' || key === 'price' || key === 'categoryName' || key === 'number') {
                    if (product[key] !== null && product[key] !== '') {
                        formData.append(key, product[key])
                    }
                }
            }
            setLoading(true)
            await updateProduct(product.id, formData)

            navigate('/menu')
            onSuccess()
            setLoading(false)
            toast.success("Menu Updated ")
            setSelectedForEditAfterSuccess()
            return true

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const handleClickCancle = () => {
        setInputError(initialInputError)
        backToSelectForm()
    }


    const classNameP = "w-50 m-auto font-bold text-blue-800"
    return (<>
        {loaging && <Spinner transparent={true} />}
        <div>

            <div className="pt-5">
                <div className="flex flex-col">
                    <div className="flex mb-5">
                        <p className={classNameP}>Food Name :</p>
                        <Input
                            placeholder="Input Food name"
                            value={product?.name}
                            name="name"
                            onChange={handleChangeInput}
                            error={inputError.name}
                        />
                    </div>

                    <div className="flex mb-5 ">
                        <p className={classNameP}>Food Price :</p>
                        <Input
                            placeholder="Input Food Price"
                            value={product?.price}
                            name="price"
                            onChange={handleChangeInput}
                            error={inputError.price}
                        />
                    </div>

                    <div className="flex mb-5 ">
                        <p className={`${classNameP}`}>category name :</p>
                        <Input
                            placeholder="Input category name"
                            value={product?.categoryName}
                            name="categoryName"
                            onChange={handleChangeInput}
                            error={inputError.categoryName}
                        />
                    </div>

                    <div className="flex mb-5 ">
                        <p className={classNameP}>Food No. :</p>
                        <Input
                            placeholder="Input Food Number"
                            value={product?.number}
                            name="number"
                            onChange={handleChangeInput}
                            error={inputError.number}
                        />
                    </div>

                    <div className="flex mb-5 flex-col gap-2 items-center">
                        <p className={`${classNameP}  text-center`}>Food Picture</p>

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
                                        src={file ? URL.createObjectURL(file) : product?.imageUrl || blankImage}
                                        onClick={() => fileEl.current.click()}
                                        size={10}
                                        className={"w-full h-full object-contain "}
                                    />
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

                <div className=" flex justify-center gap-10">
                    <Button onClick={handleClickSave} bg="green">Save</Button>
                    <Button onClick={handleClickCancle} bg="red">Cancle</Button>
                </div>
            </div>
        </div>
    </>
    )


}