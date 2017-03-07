var date = new Date(); 

var month = date.getMonth() + 1;
console.log(date.getDate() + '/' + month + '/' + date.getFullYear()); 

console.log(date.toLocaleDateString());