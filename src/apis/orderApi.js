import axios from "../config/axios"
const orderApi = {}

orderApi.create = body => axios.post('/order/create', body)
orderApi.getAllByUserId = () => axios.get('/order/getByUserId')
orderApi.getAllForAdmin = () => axios.get('/order/getAll')
orderApi.update = (orderId, body) => axios.patch(`/order/update/${orderId}`, body)
orderApi.delete = orderId => axios.delete(`/order/delete/${orderId}`)

export default orderApi