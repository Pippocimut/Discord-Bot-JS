const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const curseSchema = new Schema({
   message:{
    type:String,
    required: true
   },
   date: {
    type: Date,
    required:true
   },
    name: {
      type: String,
      required: true
    },
    userDiscordId: {
      type: String,
      required: true
    }
  
});

module.exports = mongoose.model('Curse', curseSchema);
