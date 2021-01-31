var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var companySchema = new Schema({
  name: { type: String, required: true },
  suvprice: { type: String, required: true },
  minivanprice: { type: String, required: true },
  sedanprice: { type: String, required: true },
  
});
var serviceSchema = new Schema({
  title: { type: [String], index: true , required:true},
  description: {
    type: String
    
  },
  companies:  [companySchema] 
  
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
