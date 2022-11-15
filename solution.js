
import Formulas from "./Comparison/Formulas.js";

const compare = new Formulas();

const cars = ["Saab", "Volvo", "BMW"];
const cars2 = ["Saab", "Volvo", "BMW"];
const object1 = {true:"That", "7": "This"};

const object2 = {"5":"That"};
const object5 = {"5": "That", "This": 4, "4":{"Okay": true}, "6": [1,3,4,5,6]}
const object3 = {"5": "That", "This": 4, "4":{"Okay": true}, "6": [1,3,4,5,6]}
const object4 = {"5":"That",
    "2": 1,
    "3": true,
    "4": [1,2,3,4,5]};

var key = 1

//if (typeof object2 === 'object' && Array.isArray(object2)) {
  //  console.log(object2)
//}

console.log(compare.checkHash("deep",object3,object5));




