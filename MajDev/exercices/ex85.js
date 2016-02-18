var number = {
    random: function () {
        return Math.random();
    },
    toto: function () {
        return 'toto';
    }
};

String.prototype.dashed = function () {
    return '-' + this;
};

console.log(number.random());
console.log(number.toto().dashed());


