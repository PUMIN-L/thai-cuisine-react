import { useEffect, useState } from "react";
import useProduct from "../hook/useProduct";
import SelectMenu from "./SelectMenu";
import Button from "../../../components/Button";
import EditMenuForm from "./EditMenuForm";
import { useNavigate } from "react-router-dom";

const openInit = {
    openButtonSelect: false,
    openSelectForm: true,
    openEditMenuForm: false
}

export default function EditMenuContainer({ clossModal }) {

    const navigate = useNavigate()

    const { selectedForEdit, setSelectedForEdit, allProduct } = useProduct()

    const [open, setOpen] = useState(openInit)

    useEffect(() => {
        if (selectedForEdit?.id !== 0) {
            setOpen(prev => ({ ...prev, "openButtonSelect": true }))
        } else {
            setOpen(prev => ({ ...prev, "openButtonSelect": false }))
        }
    }, [selectedForEdit])

    const handleClickEdit = () => {
        navigate(`/setting?id=${selectedForEdit.id}`)
        setOpen(prev => ({ ...prev, "openEditMenuForm": true }))
        setOpen(prev => ({ ...prev, "openButtonSelect": false }))
        setOpen(prev => ({ ...prev, "openSelectForm": false }))
    }

    const onClickCancle = () => {
        const resetMenu = allProduct.filter(e => e.id === 0)
        setSelectedForEdit(resetMenu[0])
        setOpen(prev => ({ ...prev, "openButtonSelect": false }))
        clossModal()
        navigate('/setting')
    }

    const backToSelectForm = () => {
        setOpen(prev => ({ ...prev, "openButtonSelect": true }))
        setOpen(prev => ({ ...prev, "openSelectForm": true }))
        setOpen(prev => ({ ...prev, "openEditMenuForm": false }))
    }

    const onSuccess = () => {
        setOpen(prev => ({ ...prev, "openEditMenuForm": false }))
        setOpen(prev => ({ ...prev, "openButtonSelect": false }))
        setOpen(prev => ({ ...prev, "openSelectForm": true }))
    }
    return (<>
        {

            open.openSelectForm && <SelectMenu
                selected={selectedForEdit}
                setSelected={setSelectedForEdit}
                allProduct={allProduct}
            />
        }


        {open.openButtonSelect && <div className='flex gap-5 mt-3 justify-center lg:text-lg'>
            <Button bg="yellow" onClick={handleClickEdit} >Edit</Button>
            <Button bg='red' onClick={onClickCancle} >Cencle</Button>
        </div>}

        {open.openEditMenuForm && <div>< EditMenuForm
            backToSelectForm={backToSelectForm}
            onSuccess={onSuccess}
        />
        </div>}
    </>)

}

