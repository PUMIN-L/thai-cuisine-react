
import axios from "../config/axios"

const orderItemApi = {}

orderItemApi.create = data => axios.post("/orderItem/create", data)
orderItemApi.getByOrderId = orderId => axios.get(`/orderItem/getByOrderId/${orderId}`)

export default orderItemApi