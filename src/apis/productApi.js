import axios from "../config/axios"

const productApi = {}

productApi.createProduct = formData => axios.post('product/create', formData)
productApi.getAllProduct = () => axios.get('product/getAll')
productApi.edit = formData => axios.patch(`/product/update`, formData)
productApi.delete = body => axios.delete(`/product/deleteById`, { data: body })
productApi.getById = id => axios.get(`/product/getById?id=${id}`)
productApi.updateById = (id, formData) => axios.patch(`/product/updateProductById/${id}`, formData)

export default productApi  