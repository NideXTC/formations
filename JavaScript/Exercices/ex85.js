var number = 
{
	random : function(){
		return Math.random();
	},
	test : function(param){
		console.log(param);
	}
};

console.log(number.random());
console.log(number.test('coucou'));