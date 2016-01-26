var req = new XMLHttpRequest(); 
req.onreadystatechange = function(){
	if(req.readyState == 4 && req.status == 200){
		console.log(req.responseText);
	}
};
req.open('GET','http://178.62.155.193',true);
req.send(null);