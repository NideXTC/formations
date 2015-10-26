var d = new Date(), 
	tab = ['janvier', 'fevrier','mars','avril','mai','juin','juillet','aout','septembre','octobre','novembre','decembre'];

console.log(d.getDate() + ' ' +tab[d.getMonth()] + ' ' + d.getFullYear());
