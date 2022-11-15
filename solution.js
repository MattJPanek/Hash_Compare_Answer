import Formulas from "./Comparison/Formulas.js";

const compare = new Formulas();


const obj1 = {"1": "Test", "2": 3, "3": true}
const obj2 = {"1": "Test", "2": 3, "3": true}
const obj3 = {"1": "Test", "5": 3, "3": true}
const obj4 = {"1": "Test2", "2": 3, "3": true}


const obj6 = {"1": "Test2", "2": 3, "3": true, "4": [1, 2, 3, 5], "5": {"Title": "Five", "Name": "Book"}}
const obj7 = {"1": "Test2", "2": 3, "3": true, "4": [1, 2, 3, 5], "5": {"Title": "Five", "Name": "Book"}}
const obj8 = {"1": "Test2", "2": 3, "3": true, "4": [1, 2, 4, 5], "5": {"Title": "Five", "Name": "Book"}}
const obj9 = {"1": "Test2", "2": 3, "3": true, "4": [1, 2, 3, 5], "5": {"Title": "Five", "Name": "Test"}}

console.log("Test 1: Shallow Compare Same Object")
console.log(compare.checkHash("shallow", obj1, obj2, []));


console.log("Test 2: Shallow Compare Different Key")
console.log(compare.checkHash("shallow", obj1, obj3, []));

console.log("Test 3: Shallow Compare Different Value")
console.log(compare.checkHash("shallow", obj1, obj4, []));

console.log("Test 4: Shallow Compare Wrong Key Value")
console.log(compare.checkHash("shallow", obj3, obj4, []));


console.log("Test 5: Deep Compare Same Object")
console.log(compare.checkHash("deep", obj1, obj2, []));

console.log("Test 6: Deep Compare Same Object Again")
console.log(compare.checkHash("deep", obj6, obj7, []));


console.log("Test 7: Deep Compare Different Key")
console.log(compare.checkHash("deep", obj1, obj3, []));


console.log("Test 8: Deep Compare Different Value")
console.log(compare.checkHash("deep", obj1, obj4, []));

console.log("Test 9: Deep Compare Wrong Key Value")
console.log(compare.checkHash("deep", obj1, obj4, []));

console.log("Test 10: Deep Compare Different Value in Array")
console.log(compare.checkHash("deep", obj6, obj8, []));

console.log("Test 11: Deep Compare Different Value in Object")
console.log(compare.checkHash("deep", obj6, obj9, []));

