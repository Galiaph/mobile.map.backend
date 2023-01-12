// Import function from Product Model
import moment from "moment"
import { getOperators, getBsById, getUser, generateAccessToken, getLines, addSQLLine, delSQLLine } from "../models/productModels.js"
 
// Get All Operators
export const showOperators = (req, res) => {
    getOperators((err, results) => {
        if (err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}
 
// Get Base_station list by id
export const showBsById = (req, res) => {
    getBsById(req.params.id, (err, results) => {
        if (err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}

export const showLines = (req, res) => {
    getLines((err, results) => {
        if (err){
            res.send(err)
        }else{
            res.json(results)
        }
    })
}

export const addLine = (req, res) => {
    try {
        if(!req.body.line) {
            res.status(400).json({message: 'Emtpy data'})
        }
        else {
            addSQLLine(req.body.line, (err, results) => {
                if (err){
                    console.log(err)
                    res.status(500).json({message: 'Server error'})
                } else {
                    res.status(200).json({id:results.insertId})
                }
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
}

export const delLine = (req, res) => {
    try {
        if(!req.body.id) {
            res.status(400).json({message: 'Emtpy data'})
        }
        else {
            delSQLLine(req.body.id, (err, results) => {
                if (err){
                    console.log(err)
                    res.status(500).json({message: 'Server error'})
                } else {
                    res.status(200)
                }
            })
        }
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
}
 
// Get Token
export const getUserToken = (req, res) => {
    try {
        if(!req.body.username || !req.body.password) {
            res.status(400).json({message: 'Emtpy data'})
        }
        else {
            getUser({'login': req.body.username}, (err, results) => {
                if (err){
                    console.log(err)
                    res.status(500).json({message: 'Server error'})
                }else{
                    if (results[0].user_pass.localeCompare(req.body.password) == 0) {
                        const token = generateAccessToken(results[0].id, results[0].user_name)
                        const expires = moment(new Date().getTime() + 43200000).format('YYYY-MM-DD HH:mm:ssZ')
                        res.json({
                            'token': token,
                            'expires': expires,
                            'cn': results[0].user_full_name,
                            'login': results[0].user_name,
                            'root_access': results[0].root_access
                        })
                    } else {
                        res.status(401).json({message: 'Authentication error'})
                    }
                }
            })
        }
    }
    catch (e) {
        console.log(e)
        res.status(400).json({message: 'Login error'})
    }
}