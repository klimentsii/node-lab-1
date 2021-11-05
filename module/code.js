module.exports.task1 = function caesarCipher(str) {
  str = str.split('')

  let output = '';

  if(str[0] == '[') {
    str.splice(0, 1)
    str.splice(str.length-1, 1)
    for(let i = 0; i < str.length; i++) {
      if(str[i] == ',') {
        str.splice(i, 1)
      }
    }
  } 
    for (let i = 0; i < str.length; i++) {
      let count = 0
      
      for(let j = 0; j < str.length; j++) {
        if(str[i] == str[j]) {
          count++
        }
      }
  
      if(count > 1) {
        output += ')'
      } else {
        output += '('
      }
    }
  

  return `${output}`; 
};

module.exports.task2 = function(str) {
  let output = ''
  for(let i = 0; i < str; i++) {
    output += '['
    for(let j = 0; j < str; j++) {
      output += (i+1)*(j+1)
      if(j != str -1) {
        output += ','
      }
    }
    output +=']'
  }
  
  return `${output}`; 
}