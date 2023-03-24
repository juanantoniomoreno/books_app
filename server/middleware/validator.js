const { check } = require("express-validator");
const { validateResult } = require("../helpers/validateHelper");

const validateCreate =[

    check('isbn')
        .exists()
        .not()
        .isEmpty()
        .withMessage('isbn is required field')
        .matches(/^978[0-9]+$/)
        .withMessage('isbn must start with 978')
        .isLength({ min: 13, max: 13 })
        .withMessage('isbn is 13 characters length')
        .bail(),
    check('title')
        .exists()
        .not()
        .isEmpty()
        .withMessage('title is required field')
        .isLength({ min: 3, max: 150 })
        .withMessage('title is 3-150 characters length')
        .bail(),
    check('subtitle')
        .exists()
        .not()
        .isEmpty()
        .withMessage('subtitle is required field')
        .isLength({ min: 3, max: 150 })
        .withMessage('subtitle is 3-150 characters length')
        .bail(),
    check('author')
        .exists()
        .not()
        .isEmpty()
        .withMessage('author is required field')
        .isLength({ min: 3, max: 100 })
        .withMessage('subtitle is 3-100 characters length')
        .bail(),
    check('published')
        .exists()
        .not()
        .isEmpty()
        .withMessage('published is required field')
        .bail(),
    check('publisher')
        .exists()
        .not()
        .isEmpty()
        .withMessage('publisher is required field')
        .isLength({ min: 3, max: 100 })
        .withMessage('publisher is 3-100 characters length')
        .bail(),
    check('pages')
        .exists()
        .not()
        .isEmpty()
        .withMessage('pages is required field')
        .isNumeric()
        .custom((value, { req }) => {
          //todo
          if( value < 1 || value > 20000){
            throw new Error('pages between 1 and 20000')
          }
          return true;
        })
        .withMessage('pages min 1 max 20000')
        .bail(),
    check('description')
        .exists()
        .not()
        .isEmpty()
        .withMessage('description is required field')
        .isLength({ min: 3, max: 65000 })
        .withMessage('description is 3-65000 characters length')
        .bail(),
    check('website')
        .exists()
        .not()
        .isEmpty()
        .withMessage('website is required field')
        .matches(/^https?:\/\/[\w]+(\.[\w]+)+[/#?]?.*$/)
        .withMessage('incorrect website https://...')
        .bail(),
    check('category')
        .exists()
        .not()
        .isEmpty()
        .withMessage('category is required field')
        .isLength({ min: 3, max: 50 })
        .withMessage('category is 3-50 characters length')
        .bail(),
    (req, res, next) => {
        validateResult( req, res, next )
    }
]

module.exports = { validateCreate }