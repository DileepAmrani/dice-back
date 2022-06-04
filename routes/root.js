const express = require('express')
const router = express.Router()
const readIcons = require('../controllers/rootController')
console.log('readIcons: ', readIcons)
router.get('/readIcons', readIcons)

module.exports = router
