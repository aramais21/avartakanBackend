const { validationResult, body } = require('express-validator');

const concertValidator = () => [
  body('name').isString().isLength({min: 3, max: 32}),
  body('group').isString().isLength({min: 3, max: 16}),
  body('genre').isString().isLength({min: 3, max: 16}),
  body('date').isDate(),
  body('price').isNumeric()
]

const postValidator = () => [
  body('group').isString().isLength({min: 3, max: 16}),
  body('number').isNumeric().isLength({min: 12}),
  body('email').isEmail()
]

const songValidator = () => [
  body('tabs').isURL(),
  body('chords').isURL(),
  body('lyrics').isString()
]

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
      error: extractedErrors,
    })
}

module.exports = {validate, concertValidator, postValidator, songValidator};