const { throws } = require('assert');
const { error } = require('console');
const { resolve } = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input:process.stdin,
    output: process.stdout
});

function ConvertHandler() {
  
  this.getNum = function(input) {
    // Check if the input is singular (no number attached)
    const extractStr = input.match(/\d+(\.\d+)?|\d+\/\d+(\.\d+)?|[^\d\s]+/g);
    const slash = input.match(/\//g)
    const number = Number(extractStr[0])
  
      if(extractStr.length === 1){
        input = 1;
        return input
      }else if(extractStr.length > 1 && slash === null){
        return number
      }else{
        if(slash.length > 1) return 'invalid number'
        else{
          const numerator = extractStr[0]
          const denominator = extractStr[2]
          return numerator / denominator
        }
      }

      return number
    
  };
  
  this.getUnit = function(input) {
    
    
      const units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];

  // Use regular expression to match the unit at the end of the string
      const match = input.match(/[a-zA-Z]+$/);
      let unit;
      if (match) {
          unit = match[0].toLowerCase();
      }
      return this.spellOutUnit(unit)
      
  };
  
  this.getReturnUnit = function(initUnit) {

  const units = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };
    if(initUnit === units[initUnit]){
      return 1
    }else{
      return units[initUnit] 
    }
       
  };


  this.spellOutUnit = function(unit) {
      
    unit = unit.toLowerCase();

    let units = ['mi', 'km', 'lbs', 'kg', 'gal', 'l'];
  
    if (units.includes(unit)) {
      if (unit === 'l') {
        return 'L'; // Return "L" as uppercase
      } else {
        return unit; // Return unit as lowercase
      }
    }
  
    return "invalid unit";
  };
  

  this.convert = function(initNum, initUnit) {

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
   

    conversionRate = {
      gal: galToL,
      L: 1 / galToL,
      mi: miToKm,
      km: 1 / miToKm,
      lbs: lbsToKg,
      kg: 1 / lbsToKg,
    };

      return Math.round(conversionRate[initUnit] * initNum * 1e5) / 1e5

  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const unitMapping = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };
      return `${initNum} ${unitMapping[initUnit]} converts to ${returnNum} ${unitMapping[returnUnit]}`
  };

}




module.exports = {
  ConvertHandler
};






