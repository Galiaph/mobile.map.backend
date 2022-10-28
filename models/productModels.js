// import connection
import db from "../config/database.js";

// Get Operator list
export const getOperators = (result) => {
    db.query("SELECT * FROM operators", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Get Base_station list by id
export const getBsById = (id, result) => {
    db.query("SELECT * FROM base_station WHERE bs_operator=?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

// Get User token by login/pass
export const getUserToken = (data, result) => {
    db.query("SELECT * FROM users WHERE user_name=? AND user_pass=?", [data.login, data.pass], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}