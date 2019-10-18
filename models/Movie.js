const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({
    director_id:Schema.Types.ObjectId,
    title:{
        type: String,
        required:[true,'´{PATH}´ alanı zorunludur'],
        maxlength:[15,'´{PATH}´ alanı en fazla (´{VALUE}´), ({MAXLENGTH} karakterden küçük olmalı)'],
        minlength:[3,'´{PATH}´ alanı en fazla (´{VALUE}´), ({MINLENGTH}) karakterden büyük olmalı']
    },
    category: String,
    country:String,
    year: Number,
    imdb_score: Number,
    date:{
        type: Date,
        default:Date.now
    }
});

module.exports=mongoose.model('movie',MovieSchema);