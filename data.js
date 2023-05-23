function processInput(input) {
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

   
};

// Example usage
console.log(processInput('4'))
