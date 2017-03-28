const date = new Date();

const months = ['janv', 'fev', 'mars'];

console.log(date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()) ;

console.log(date.toLocaleDateString('fr-FR',{
    day : 'numeric',
    year : 'numeric',
    month : 'short'
}));