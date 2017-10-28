const Immutable = require('immutable');
var map1 = Immutable.Map({key: "value"});
var map2 = map1.set("key","foo");
console.log(map1 === map2);
var map3 = map1;
console.log(map1 === map3);
