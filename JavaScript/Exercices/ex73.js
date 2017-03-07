var date = new Date(); 

months = ['janvier', 'février', 'mars']; 

console.log(date.getDate() + ' ' + 
	months[date.getMonth()] + ' ' + 
	date.getFullYear());

console.log(date.toLocaleDateString('fr-FR',{
	weekday : 'long',
	day : 'numeric', 
	year : 'numeric', 
	month : 'long'
}));