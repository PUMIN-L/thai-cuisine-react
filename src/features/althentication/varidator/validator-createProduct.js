
import Joi from "@hapi/joi";
import validateWith from '../../../../utils/handle-varidate'

const createProductSchema = Joi.object({
    name: Joi.string(),
    price: Joi.string(),
    categoryName: Joi.string(),
    description: Joi.string().allow(null, ''),
    number: Joi.string()
})

const varidateCreateProductSchema = input => validateWith(createProductSchema)(input)

export default varidateCreateProductSchema

