import express from "express"
import { showOperators, showBsById, getUserToken, showLines, addLine, delLine, showUplinks } from "../controllers/product.js"
import { authenticateJWT } from "../models/productModels.js"
import multer from "multer"
const upload = multer()

const router = express.Router()

router.get('/operators', authenticateJWT, showOperators)
 
router.get('/bs/:id', authenticateJWT, showBsById)

router.get('/lines', authenticateJWT, showLines)

router.get('/uplinks', authenticateJWT, showUplinks)

router.post('/token', upload.none(), getUserToken)

router.post('/add', authenticateJWT, upload.none(), addLine)

router.post('/del', authenticateJWT, upload.none(), delLine)

export default router