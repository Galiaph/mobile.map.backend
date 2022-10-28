// Import function from Product Model
import { getOperators, getBsById, getUserToken } from "../models/productModels.js";
 
// Get All Operators
export const showOperators = (req, res) => {
    getOperators((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Get Base_station list by id
export const showBsById = (req, res) => {
    getBsById(req.params.id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Get Token
export const showUserToken = (req, res) => {
    const data = req.body;
    getUserToken(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}