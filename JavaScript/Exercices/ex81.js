const obj = [{
    name: "Han",
    first_name: "Solo"
}, {
    name: "Chew",
    first_name: "Bacca"
}];

const obj2 = {
    students: [
        {
            name: "Han",
            first_name: "Solo"
        }
        , {
            name: "Chew",
            first_name: "Bacca"
        }
    ]
};

console.table(obj);
console.table(obj2.students);