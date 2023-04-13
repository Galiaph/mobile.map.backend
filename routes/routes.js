import express from "express"
import { 
    showOperators,
    showBsById,
    getUserToken,
    showLines,
    addLine,
    delLine,
    showUplinks,
    showProviders,
    showMarks,
    addMark,
    delMark,
    showDistricts,
    showDsById } from "../controllers/product.js"
import { authenticateJWT } from "../models/productModels.js"
import multer from "multer"
const upload = multer()

const router = express.Router()

router.get('/operators', authenticateJWT, showOperators)
 
router.get('/bs/:id', authenticateJWT, showBsById)

router.get('/ds/:id', authenticateJWT, showDsById)

router.get('/districts', authenticateJWT, showDistricts)

router.get('/lines', authenticateJWT, showLines)

router.get('/marks', authenticateJWT, showMarks)

router.get('/uplinks', authenticateJWT, showUplinks)

router.get('/providers', authenticateJWT, showProviders)

router.post('/token', upload.none(), getUserToken)

router.post('/addline', authenticateJWT, upload.none(), addLine)

router.post('/addmark', authenticateJWT, upload.none(), addMark)

router.post('/delline', authenticateJWT, upload.none(), delLine)

router.post('/delmark', authenticateJWT, upload.none(), delMark)

export default router