

const validateWith = schema => input => {
    const { error } = schema.validate(input, { abortEarly: false })
    if (error) {
        // console.dir(error)
        const result = error.details.reduce((acc, el) => {
            acc[el.path[0]] = el.message
            return acc
        }, {})
        return result
    }

}



export default validateWith