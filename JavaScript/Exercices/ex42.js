const str = "1231f156415"; 

const result = /([a-z]+)/gmi.exec(str);
const result2 = /(\D+)/gmi.exec(str);

console.log(result);
console.log(result2);