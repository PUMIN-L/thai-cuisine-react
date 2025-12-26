
import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'
import useProduct from '../hook/useProduct'
import Button from '../../../components/Button'
import Spinner from '../../../components/Spinner'
import { toast } from 'react-toastify'
import Modal from '../../../components/Modal'
import ConfirmDelete from '../../orders/components/ConfirmDelete'
import thaiFood from '../../../assets/thaiFood.jpg'

export default function DeleteMenuForm() {

    const { allProduct, deleteProduct } = useProduct()

    const [products, setProducts] = useState(allProduct)
    const [selected, setSelected] = useState(products[0])
    const [deleteButton, setDeleteButton] = useState(false)
    const [loadingForDelete, setLoadingForDelete] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false)

    const handleOnChange = e => {
        if (e.id !== 0) {
            setDeleteButton(true)
        }
        setSelected(e)
    }

    const handleClickDelete = async () => {
        setOpenConfirmDelete(true)
    }

    const deleteFunction = async () => {
        try {
            setOpenConfirmDelete(false)
            setLoadingForDelete(true)
            const id = selected.id

            await deleteProduct(id)

            const afterDelete = products.filter(item => {
                if (item.id !== id) {
                    return item
                }
            })
            setProducts(afterDelete)
            setSelected(products[0])
            return true
        } catch (error) {
            console.log(error)
        } finally {
            setDeleteButton(false)
            setLoadingForDelete(false)
            toast.success("Menu deleted")
        }
        return true
    }

    const handleClickCencle = () => {
        setSelected(products[0])
        setDeleteButton(false)
    }


    return (<>
        {loadingForDelete && <Spinner transparent={true} />}
        <div className='mt-3  lg:w-[20rem]'>
            <Listbox value={selected} onChange={handleOnChange}>
                <div className="relative ">
                    <ListboxButton className="grid border-2 w-full cursor-default 
                    grid-cols-1 rounded-md bg-gray-800 py-1.5 pr-2 pl-3 text-left text-white 
                     outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 
                    focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6">
                        <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6 cursor-pointer">
                            <img
                                alt=""
                                src={selected.imageUrl || thaiFood}
                                className="size-10 shrink-0 rounded-lg bg-gray-700 outline -outline-offset-1 outline-white/10"
                            />
                            <span className="block truncate ml-2 lg:text-lg">No.{selected.number}</span>
                            <span className="block truncate lg:text-lg">{selected.name}</span>
                        </span>
                        <ChevronUpDownIcon
                            aria-hidden="true"
                            className="col-start-1 row-start-1 size-5 self-center justify-self-end 
                            text-gray-400 sm:size-4 cursor-pointer"
                        />
                    </ListboxButton>

                    <ListboxOptions
                        transition
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 
                        text-base outline-1 -outline-offset-1 outline-white/10 data-leave:transition 
                        data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                    >
                        {products.map((menu) => {
                            if (menu.id !== 1) {
                                return (
                                    <ListboxOption
                                        key={menu.id}
                                        value={menu}
                                        className="group relative cursor-default py-2 pr-9 pl-3 text-white lg:text-lg
                                        select-none data-focus:bg-indigo-500 data-focus:outline-hidden"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                alt=""
                                                src={menu.imageUrl || thaiFood}
                                                className="size-5 shrink-0 rounded-full outline -outline-offset-1 outline-white/10"
                                            />
                                            <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                                No.{menu.number}
                                            </span>
                                            <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">
                                                {menu.name}
                                            </span>

                                        </div>

                                        <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white">
                                            <CheckIcon aria-hidden="true" className="size-5" />
                                        </span>
                                    </ListboxOption>
                                )
                            }

                        })}
                    </ListboxOptions>
                </div>
            </Listbox >
        </div >
        {deleteButton && <div className='flex gap-5 mt-3 justify-center lg:text-lg'>
            <Button bg="red" onClick={handleClickDelete}>Delete</Button>
            <Modal
                onClose={() => setOpenConfirmDelete(false)}
                open={openConfirmDelete}
                title={`Confirm delete menu No.${selected.id}`}
            >
                <ConfirmDelete
                    deleteFunction={deleteFunction}
                    clickCancle={setOpenConfirmDelete}
                />
            </Modal>
            <Button bg='yellow' onClick={handleClickCencle} >Cencle</Button>
        </div>}
    </>)
}