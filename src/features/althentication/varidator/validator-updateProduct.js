
import Joi from "@hapi/joi";
import validateWith from '../../../../utils/handle-varidate'

const updateProductSchema = Joi.object({
    name: Joi.string(),
    price: Joi.string(),
    categoryName: Joi.string().allow(null, ''),
    description: Joi.string().allow(null, ''),
    createAt: Joi.date().optional(),
    editedAt: Joi.date().optional(),
    id: Joi.number(),
    imageUrl: Joi.any(),
    publicId: Joi.string().optional(),
    quantity: Joi.any(),
    number: Joi.string()

})

const varidateUpdateProductSchema = input => validateWith(updateProductSchema)(input)

export default varidateUpdateProductSchema

