import { createContext, useState } from "react"
import productApi from "../../../apis/productApi"

export const ProductContext = createContext()

export default function ProductContextProvider({ children }) {
  const [allProduct, setAllProduct] = useState(null)
  const [isProductLoading, setIsProductLoading] = useState(true)
  const [selectedForEdit, setSelectedForEdit] = useState(null)

  const fetcAllProduct = async () => {
    try {
      const allProduct = await productApi.getAllProduct()

      setAllProduct(allProduct.data)
      setSelectedForEdit(allProduct.data[0])
    } catch (err) {
      console.log(err)
    } finally {
      setIsProductLoading(false)
    }
  }

  const createProduct = async (formdata) => {
    const res = await productApi.createProduct(formdata)
    setAllProduct((prev) => [...prev, res.data])
  }

  const deleteProduct = async (id) => {
    const body = { id }

    const result = await productApi.delete(body)

    const allProductAfterDelete = allProduct.filter((item) => {
      if (item.id !== result.data.id) {
        return item
      }
    })

    setAllProduct(allProductAfterDelete)
  }

  const getProductById = async (id) => {
    return await productApi.getById(id)
  }

  const updateProduct = async (id, formData) => {
    const result = await productApi.updateById(id, formData)
    const newData = result.data
    setAllProduct((prev) => (prev = allProduct.filter((e) => e.id !== id)))
    setAllProduct((prev) => [newData, ...prev])
  }

  const setSelectedForEditAfterSuccess = async () => {
    try {
      const allProduct = await productApi.getAllProduct()
      setSelectedForEdit(allProduct.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  const value = {
    createProduct,
    isProductLoading,
    allProduct,
    deleteProduct,
    getProductById,
    updateProduct,
    selectedForEdit,
    setSelectedForEdit,
    setSelectedForEditAfterSuccess,
    fetcAllProduct
  }

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}
