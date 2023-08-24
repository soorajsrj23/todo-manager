const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
 
    text:{
        type:String,
        required:true,
        default:"null"
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
      ref: 'User',

    },
    priority:{
        type:String,
        required:true
    }

})


const Todo =mongoose.model('Todo',TodoSchema)

module.exports= Todo;