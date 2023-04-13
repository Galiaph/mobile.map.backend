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
    
    return jwt.sign(payload, accessTokenSecret, {expiresIn: '12h'})
}
// Get Operator list
export const getOperators = (result) => {
    db.query("SELECT * FROM operators;", (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const getLines = (result) => {
    db.query("SELECT * FROM lines_oper;", (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const getMarks = (result) => {
    db.query("SELECT * FROM providers_geo;", (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const getUplinks = (result) => {
    db.query("SELECT * FROM uplinks;", (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const getProviders = (result) => {
    db.query("SELECT * FROM providers;", (err, results) => {             
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
    db.query("SELECT b.id, b.bs_name, b.bs_latitude, b.bs_longitude, b.bs_comment, b.bs_operator, \
                b.bs_2g,b.bs_3g,b.bs_4g,b.bs_status,l.station FROM base_station AS b LEFT JOIN left_bank AS l ON \
                b.id=l.station WHERE b.bs_operator=?;", [id], (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

// Get districts geo_array by id
export const getDsById = (id, result) => {
    db.query("SELECT * FROM districts WHERE id=?;", [id], (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const getDistricts = (result) => {
    db.query("SELECT id,district_name FROM districts ORDER BY district_name;", (err, results) => {             
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
    db.query("SELECT * FROM users WHERE user_name=?;", [data.login], (err, results) => {             
        if(err) {
            console.log(err)
            result(err, null)
        } else {
            result(null, results)
        }
    })
}

export const addSQLLine = (item, result) => {
    if (typeof(item.markerId) == 'string') {
        db.query("INSERT lines_oper (hint, stroke_color, stroke_width, geoCoords) VALUES (?, ?, ?, ?);", [item.properties.hintContent, item.options.strokeColor,  item.options.strokeWidth, JSON.stringify(item.coords)], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    } else {
        db.query("UPDATE lines_oper SET hint=?, stroke_color=?, stroke_width=?, geoCoords=? WHERE id=?;", [item.properties.hintContent, item.options.strokeColor, item.options.strokeWidth, JSON.stringify(item.coords), item.markerId], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    }
}

export const addSQLMark = (item, result) => {
    if (typeof(item.markerId) == 'string') {
        db.query("INSERT providers_geo (latitude, longitude, balloon, provider) VALUES (?, ?, ?, ?);", [item.coords[0],  item.coords[1], item.properties.balloonContentHeader, item.provider], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    } else {
        db.query("UPDATE providers_geo SET latitude=?, longitude=?, balloon=?, provider=? WHERE id=?;", [item.coords[0],  item.coords[1], item.properties.balloonContentHeader, item.provider, item.markerId], (err, results) => {             
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
    if (typeof(id) == 'string') {
        result(null, result)
    } else {
        db.query("DELETE FROM lines_oper WHERE id=?;", [id], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    }
}

export const delSQLMark = (id, result) => {
    if (typeof(id) == 'string') {
        result(null, result)
    } else {
        db.query("DELETE FROM providers_geo WHERE id=?;", [id], (err, results) => {             
            if(err) {
                console.log(err)
                result(err, null)
            } else {
                result(null, results)
            }
        })
    }
}
