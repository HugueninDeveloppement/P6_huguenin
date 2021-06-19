const mongoose = require("mongoose");
const user = require("./user");

/**modele:
 * id : mongodb / ObjectId
 * userId : mongodb / string
 * name : string
 * manufacturer : string
 * description : string
 * mainPepper : string
 * imageUrl : string
 * heat : number
 * likes : number
 * dislikes : number
 * userLikes : array idUser : string
 * userDislikes: array idUser : string
 * **/

const SauceSchema = mongoose.Schema({
    userId : { type: String, required : true },
    name : { type: String, required : true },
    manufacturer : { type: String, required : true },
    description: { type: String, required : true },
    mainPepper : { type: String, required : true },
    imageUrl : { type: String, required : true },
    heat : { type: Number},
    likes : { type: Number},
    dislikes : { type: Number}, 
    userLikes : [String],
    userDislikes : [String]
});

module.exports = mongoose.model('Sauce', SauceSchema) ;