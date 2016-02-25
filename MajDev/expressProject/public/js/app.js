var socket = io.connect('http://localhost:3000');

socket.on('toto',function(d){
    console.log('toto', d);
});

socket.on('Users',function(d){
    console.log('USERS : ', d);
});

$('form').submit(function(e){
    e.preventDefault();

    socket.emit('form', $(this).serializeArray());
});

socket.emit('tata',{"tata":"tata"});

