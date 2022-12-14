// import connection
import db from "../config/database.js"
//import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const accessTokenSecret = 'aslDkfjZisvTo7A9d8Uo4j534kjrBasWuvK8d'

export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader) {
        const token = authHeader.split(' ')[1]

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403)
            }

            req.user = user
            next()
        })
    } else {
        res.sendStatus(401)
    }
}

// Generate token
export const generateAccessToken = (id, user) => {
    const payload = {
        userId: id,
        login: user
    }
    
    return jwt.sign(payload, accessTokenSecret, {expiresIn: '1h'})
}
// Get Operator list
export const getOperators = (result) => {
    db.query("SELECT * FROM operators", (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const getLines = (result) => {
    db.query("SELECT * FROM lines_oper", (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

// Get Base_station list by id
export const getBsById = (id, result) => {
    db.query("SELECT * FROM base_station WHERE bs_operator=?", [id], (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

// Get User token by login/pass
export const getUser = (data, result) => {
    db.query("SELECT * FROM users WHERE user_name=?", [data.login], (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const addSQLLine = (item, result) => {
    if (item.markerId.includes('key')) {
        db.query("INSERT lines_oper (hint, stroke_color, stroke_width, geoCoords) VALUES (?, ?, ?, ?)", [item.properties.hintContent, item.options.strokeColor,  item.options.strokeWidth, JSON.stringify(item.coords)], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    } else {
        db.query("UPDATE lines_oper SET hint=?, stroke_color=?, stroke_width=?, geoCoords=? WHERE id=?", [item.properties.hintContent, item.options.strokeColor, item.options.strokeWidth, JSON.stringify(item.coords), item.markerId], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    }
}

export const delSQLLine = (id, result) => {
    db.query("DELETE FROM lines_oper WHERE id=?", [id], (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}