function convertUnits(input) {
  const valueRegex = /^([\d.]+)\s*([\w]+)$/;
  const fractionRegex = /^([\d.]+)\/([\d.]+)\s*([\w]+)$/;
  const singularUnitRegex = /^([\w]+)$/;

  let match = input.match(fractionRegex);
  let value, numerator, denominator, unit;

  if (match) {
    numerator = parseFloat(match[1]);
    denominator = parseFloat(match[2]);
    unit = match[3].toLowerCase();
    value = numerator / denominator;
  } else {
    match = input.match(valueRegex);
    if (!match) {
      match = input.match(singularUnitRegex);
      if (!match) {
        return "invalid number and unit";
      }
      value = 1;
      unit = match[1].toLowerCase();
    } else {
      value = parseFloat(match[1]);
      unit = match[2].toLowerCase();
    }
  }

  if (isNaN(value)) {
    if (unit && unit !== "") {
      return "invalid number";
    } else {
      return "invalid number and unit";
    }
  }

  if (!isValidUnit(unit)) {
    if (unit && unit !== "") {
      return "invalid unit";
    } else {
      return "invalid number and unit";
    }
  }
  function isValidUnit(unit) {
    const validUnits = ["km", "mi", "gal", "l", "lbs", "kg"];
    return validUnits.includes(unit);
  }

  let initNum, initUnit, returnNum, returnUnit, string;

  switch (unit) {
    case "km":
      initNum = value;
      initUnit = "km";
      returnNum = value * 0.621371;
      returnUnit = "mi";
      string = `${value} kilometers converts to ${returnNum.toFixed(5)} miles`;
      break;
    case "mi":
      initNum = value;
      initUnit = "mi";
      returnNum = value * 1.60934;
      returnUnit = "km";
      string = `${value} miles converts to ${returnNum.toFixed(5)} kilometers`;
      break;
    case "gal":
      initNum = value;
      initUnit = "gal";
      returnNum = value * 3.78541;
      returnUnit = "L";
      string = `${value} gallons converts to ${returnNum.toFixed(5)} liters`;
      break;
    case "l":
      initNum = value;
      initUnit = "L";
      returnNum = value / 3.78541;
      returnUnit = "gal";
      string = `${value} liters converts to ${returnNum.toFixed(5)} gallons`;
      break;
    case "lbs":
      initNum = value;
      initUnit = "lbs";
      returnNum = value * 0.453592;
      returnUnit = "kg";
      string = `${value} pounds converts to ${returnNum.toFixed(5)} kilograms`;
      break;
    case "kg":
      initNum = value;
      initUnit = "kg";
      returnNum = value / 0.453592;
      returnUnit = "lbs";
      string = `${value} kilograms converts to ${returnNum.toFixed(5)} pounds`;
      break;
    default:
      if (unit !== "") {
        return "invalid unit";
      } else {
        return "invalid number and unit";
      }
  }

  return {
    initNum,
    initUnit,
    returnNum: returnNum.toFixed(5),
    returnUnit,
    string,
  };
}

module.exports = convertUnits;
