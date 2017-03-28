const text = '{"name" : "Dupont", "first_name" : "Jean"}';
const json = JSON.parse(text);

console.log(json.first_name);

console.log(JSON.stringify(json), typeof JSON.stringify(json));