var tab = [4, 3, 5, 8];

tab.forEach(function (v, i, a) {
    console.log(v, a[i]);
});
console.log('-----');
tab.forEach(function (v) {
    console.log(v);
});