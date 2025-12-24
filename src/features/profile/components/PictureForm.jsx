import { useRef, useState } from "react"
import { toast } from "react-toastify"
import Spinner from "../../../components/Spinner"
import FormButton from "./FormButton"
import useAuth from "../../../hook/useAuth"

export default function PictureForm({ title, initialImage, render, onSuccess }) {

    const fileEl = useRef()

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const { updateAuthUserProfilePicture } = useAuth()

    const handleClickSave = async () => {
        try {
            if (file) {
                const formData = new FormData()
                formData.append('picture', file)

                setLoading(true)

                await updateAuthUserProfilePicture(formData)
                return true
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
            setFile(false)
        }
    }

    return (
        <>
            <div className=" mt-3 flex justify-center items-center">
                {loading && <Spinner transparent={true} />}

                <input
                    type="file"
                    ref={fileEl}
                    className="hidden"
                    onChange={e => {
                        if (e.target.files[0]) {
                            setFile(e.target.files[0])
                        }
                    }}
                />

                <div>

                    <div className="flex">

                        <div>
                            {render(file ? URL.createObjectURL(file) : initialImage)}
                        </div>

                        <div
                            className="font-bold flex flex-col justify-center items-center ml-2"
                        >
                            <FormButton onClick={() => fileEl.current.click()} >Edit Picture Profile</FormButton>
                            {file && (<div className="flex justify-center items-center">

                                <FormButton onClick={handleClickSave} color='green' >Save</FormButton>
                                <FormButton
                                    onClick={() => {
                                        setFile(null)
                                        fileEl.current.value = ''
                                    }}
                                    color={'red'}
                                >
                                    Cancel
                                </FormButton>
                            </div>)}
                        </div>

                    </div>
                </div>

            </div >
        </>
    )
}