const obj = {
    teachers: [
        {
            name: "Han",
            first_name: "Solo"
        }
        , {
            name: "Chew",
            first_name: "Bacca"
        }
    ],
    students: [
        {
            name: "Marty",
            first_name: "McFly"
        }
        , {
            name: "Doc",
            first_name: "Brown"
        }
    ]
};

console.log(obj.students[0].name);
console.log(obj['students'][0]['name']);
