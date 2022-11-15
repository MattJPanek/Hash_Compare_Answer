import SourceTarget from './../DataObjects/SourceTarget.js'
import SuccessMessage from './../DataObjects/SuccessMessage.js'
/**
 * Class Formulas
 * This contains all the logic that is used for the Hash Compare
 * Contains:
 * 1. checkIfShallow - This return true or false based on if two hashes are the same
 * 2. shallowCompare - This will return an Object List of differences between the source and target
 * 3. deepCompare - This will return an Object List of differences between the source and target
 */

class Compares {

    shallowCompare(source, target) {
        if (typeof source !== typeof target) {
            return false;
        }
        if (typeof (source) === "array") {
            if (source.length !== target.length) {
                return false;
            }
            return source.every((el, index) => el === target[index]);

        } else if (typeof source === "object" && Array.isArray(source) === false) {

            return Object.keys(source).every((key) => source[key] === target[key]);
        }

        return source === target;
    }

    deepCompare(source, target) {
        if (typeof source !== typeof target) {
            return false;
        }
        if (typeof source === "object" && Array.isArray(source)) {
            if (source.length !== target.length) {
                return false;
            }

            return source.every((entry, index) => this.deepCompare(entry, target[index]));
        }else if (typeof source === "object" && Array.isArray(source) === false) {
                if (Object.keys(source).length !== Object.keys(target).length) {
                    return false;
                }
            console.log("tere")
                return Object.keys(source).every((key) =>
                    this.deepCompare(source[key], target[key])
                );
            }

            return source === target;

        }

    }


export default class Formulas {

    checkHash(type, source, target, objArr) {

        if (type == "shallow") {
            const comp = new Compares();
            var bool = comp.shallowCompare(source, target)

            if (bool != true) {
                Object.entries(source).forEach((entry) => {
                    Object.entries(target).forEach((entry2) => {
                        const [key, value] = entry;
                        const [key2, value2] = entry2;

                            //Checking if key values are correct
                            if (key !== key2 && typeof key === 'string') {
                                const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                                objArr.push(sourceTarget);

                                //If the values don't match, recording the difference
                            } else if (value !== value2) {
                                const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);

                                //Checking if the type is a Number
                            } else if (key === 'string' && typeof value === 'number') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);
                                }

                                //Checking if the type is a Boolean
                            } else if (key === 'string' && typeof value === 'boolean') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);
                                }

                                //Checking if the type is an array
                            } else if (key === 'string' && Array.isArray(value)) {
                                if (value.length !== value2.length) {
                                    const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + value.length, "Target: " + value2.length);
                                    objArr.push(sourceTarget);

                                } else {
                                    const sourceIndex = value;
                                    const targetIndex = value2;

                                    //Comparing the values of each array, recording the difference
                                    for (var i = 0; i < sourceIndex.length; i++) {
                                        for (var j = 0; j < targetIndex.length; j++) {
                                            if (sourceIndex[i] !== targetIndex[j]) {
                                                const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + source[i], "Target: " + target[j]);
                                                objArr.push(sourceTarget);
                                            }
                                        }
                                    }
                                }

                                //If everything matches
                            } else if (key === 'string' && value === value2 && typeof value === 'object') {
                                const successMessage = new SuccessMessage("All values Match");
                                objArr.push(successMessage);

                                //Catch for any other generic errors
                            } else {
                                const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                    });
                });

                //Returning array
                return objArr;
            } else {
                Object.entries(source).forEach((entry) => {
                    Object.entries(target).forEach((entry2) => {
                        const [key, value] = entry;
                        const [key2, value2] = entry2;
                        if(key === key2 && value === value2) {
                            //Checking if key values are correct
                            if (key !== key2 && typeof key === 'string') {
                                const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                                objArr.push(sourceTarget);

                                //If the values don't match, recording the difference
                            } else if (value !== value2) {
                                const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);

                                //Checking if the type is a Number
                            } else if (key === 'string' && typeof value === 'number') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);
                                }

                                //Checking if the type is a Boolean
                            } else if (key === 'string' && typeof value === 'boolean') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);
                                }

                                //Checking if the type is an array
                            } else if (key === 'string' && Array.isArray(value)) {
                                if (value.length !== value2.length) {
                                    const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + value.length, "Target: " + value2.length);
                                    objArr.push(sourceTarget);

                                } else {
                                    const sourceIndex = value;
                                    const targetIndex = value2;

                                    //Comparing the values of each array, recording the difference
                                    for (var i = 0; i < sourceIndex.length; i++) {
                                        for (var j = 0; j < targetIndex.length; j++) {
                                            if (sourceIndex[i] !== targetIndex[j]) {
                                                const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + source[i], "Target: " + target[j]);
                                                objArr.push(sourceTarget);
                                            }
                                        }
                                    }

                                }

                                //If everything matches
                            } else if (key === 'string' && value === value2 && typeof value === 'object') {
                                const successMessage = new SuccessMessage("All values Match");
                                objArr.push(successMessage);

                                //Catch for any other generic errors
                            } else {
                                const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }
                        }
                    });
                });
            }

            //Returning array
            return objArr;
        }else if (type == "deep"){
            const comp = new Compares();
            var bool = comp.deepCompare(source, target)

            if (bool != true) {
                Object.entries(source).forEach((entry) => {
                    Object.entries(target).forEach((entry2) => {
                        const [key, value] = entry;
                        const [key2, value2] = entry2;
                        //console.log("Object 1 key:" + key + " Object 2 key: "+ key2+"\n");
                        //console.log("Object 1 value:" + value + " Object 2 value: "+ value2);
                        //Checking if key values are correct
                        if (key !== key2 && typeof key === 'string') {
                            const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                            objArr.push(sourceTarget);

                            //If the values don't match, recording the difference
                        } else if (value !== value2) {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);

                            //Checking if the type is a Number
                        } else if (key === 'string' && typeof value === 'number') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                            //Checking if the type is a Boolean
                        } else if (key === 'string' && typeof value === 'boolean') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                            //Checking if the type is an array
                        } else if (key === 'string' && Array.isArray(value)) {
                            if (value.length !== value2.length) {
                                const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + value.length, "Target: " + value2.length);
                                objArr.push(sourceTarget);

                            } else {
                                const sourceIndex = value;
                                const targetIndex = value2;

                                //Comparing the values of each array, recording the difference
                                for (var i = 0; i < sourceIndex.length; i++) {
                                    for (var j = 0; j < targetIndex.length; j++) {
                                        if (sourceIndex[i] !== targetIndex[j]) {
                                            const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex[i], "Target: " + targetIndex[j]);
                                            objArr.push(sourceTarget);
                                        }
                                    }
                                }
                            }

                        }else if(key === 'string' && Array.isArray(value) === false && typeof value === 'object') {
                            Object.entries(value).forEach((entry3) => {
                                Object.entries(value2).forEach((entry4) => {
                                    const [key3, value3] = entry3;
                                    const [key4, value4] = entry4;

                                    if (key3 !== key4 && typeof key3 === 'string') {
                                        const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key3, "Target: " + key4);
                                        objArr.push(sourceTarget);

                                        //If the values don't match, recording the difference
                                    } else if (value3 !== value4) {
                                        const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                        objArr.push(sourceTarget);

                                        //Checking if the type is a Number
                                    } else if (key3 === 'string' && typeof value3 === 'number') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is a Boolean
                                    } else if (key3 === 'string' && typeof value3 === 'boolean') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is an array
                                    } else if (key === 'string' && Array.isArray(value3)) {
                                        if (value3.length !== value4.length) {
                                            const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + value3.length, "Target: " + value4.length);
                                            objArr.push(sourceTarget);

                                        } else {
                                            const sourceIndex2 = value3;
                                            const targetIndex2 = value4;

                                            //Comparing the values of each array, recording the difference
                                            for (var i = 0; i < sourceIndex2.length; i++) {
                                                for (var j = 0; j < targetIndex2.length; j++) {
                                                    if (sourceIndex2[i] !== targetIndex2[j]) {
                                                        const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex2[i], "Target: " + targetIndex2[j]);
                                                        objArr.push(sourceTarget);
                                                    }
                                                }
                                            }
                                        }
                                    }else if(key3 === 'string' && Array.isArray(value3) === false && typeof value3 === 'object') {
                                        const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                        objArr.push(sourceTarget);
                                      //  this.checkHash('deep', value, value2, objArr)
                                    }
                                });
                            });
                            //If everything matches
                        }else if(key === 'string' && value === value2 && typeof value === 'object'){
                            const successMessage = new SuccessMessage("All values Match");
                            objArr.push(successMessage);


                        } else {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);
                        }


                    });
                });

                //Returning array
                return objArr;

            } else {
                Object.entries(source).forEach((entry) => {
                    Object.entries(target).forEach((entry2) => {
                        const [key, value] = entry;
                        const [key2, value2] = entry2;
                        console.log("Object 1 key:" + key + " Object 2 key: "+ key2+"\n");
                        console.log("Object 1 value:" + value + " Object 2 value: "+ value2);
                        //Checking if key values are correct
                        if (key !== key2 && typeof key === 'string') {
                            const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                            objArr.push(sourceTarget);

                            //If the values don't match, recording the difference
                        } else if (value !== value2) {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);

                            //Checking if the type is a Number
                        } else if (key === 'string' && typeof value === 'number') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                            //Checking if the type is a Boolean
                        } else if (key === 'string' && typeof value === 'boolean') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                            //Checking if the type is an array
                        } else if (key === 'string' && Array.isArray(value)) {
                            if (value.length !== value2.length) {
                                const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + value.length, "Target: " + value2.length);
                                objArr.push(sourceTarget);

                            } else {
                                const sourceIndex = value;
                                const targetIndex = value2;

                                //Comparing the values of each array, recording the difference
                                for (var i = 0; i < sourceIndex.length; i++) {
                                    for (var j = 0; j < targetIndex.length; j++) {
                                        if (sourceIndex[i] !== targetIndex[j]) {
                                            const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex[i], "Target: " + targetIndex[j]);
                                            objArr.push(sourceTarget);
                                        }
                                    }
                                }
                            }

                        }else if(key === 'string' && Array.isArray(value) === false && typeof value === 'object') {
                            Object.entries(value).forEach((entry3) => {
                                Object.entries(value2).forEach((entry4) => {
                                    const [key3, value3] = entry3;
                                    const [key4, value4] = entry4;

                                    if (key3 !== key4 && typeof key3 === 'string') {
                                        const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key3, "Target: " + key4);
                                        objArr.push(sourceTarget);

                                        //If the values don't match, recording the difference
                                    } else if (value3 !== value4) {
                                        const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                        objArr.push(sourceTarget);

                                        //Checking if the type is a Number
                                    } else if (key3 === 'string' && typeof value3 === 'number') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is a Boolean
                                    } else if (key3 === 'string' && typeof value3 === 'boolean') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is an array
                                    } else if (key3 === 'string' && Array.isArray(value3)) {
                                        if (value3.length !== value4.length) {
                                            const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + value3.length, "Target: " + value4.length);
                                            objArr.push(sourceTarget);

                                        } else {
                                            const sourceIndex2 = value3;
                                            const targetIndex2 = value4;

                                            //Comparing the values of each array, recording the difference
                                            for (var i = 0; i < sourceIndex2.length; i++) {
                                                for (var j = 0; j < targetIndex2.length; j++) {
                                                    if (sourceIndex2[i] !== targetIndex2[j]) {
                                                        const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex2[i], "Target: " + targetIndex2[j]);
                                                        objArr.push(sourceTarget);
                                                    }
                                                }
                                            }
                                        }
                                    }else if(key3 === 'string' && Array.isArray(value3) === false && typeof value3 === 'object') {
                                        const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                        objArr.push(sourceTarget);
                                       // this.checkHash('deep', value, value2, objArr)
                                    }
                                });
                            });
                            //If everything matches
                        }else if(key === 'string' && value === value2 && typeof value === 'object'){
                            const successMessage = new SuccessMessage("All values Match");
                            objArr.push(successMessage);


                        } else {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);
                        }


                    });
                });

                //Returning array
                return objArr;

                }

        }

    }
}











