const str = "Coucou 3"; 

const result = /([0-9]+)/gmi.exec(str);
const result2 = /(\d+)/gmi.exec(str);

console.log(result);
console.log(result2);