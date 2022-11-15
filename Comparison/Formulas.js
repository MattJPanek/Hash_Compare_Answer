import SourceTarget from './../DataObjects/SourceTarget.js'

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
                    console.log("here")
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
                    const [key, value] = entry;
                    Object.entries(target).forEach((entry2) => {
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
                    const [key, value] = entry;
                    Object.entries(target).forEach((entry2) => {
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

                            //Catch for any other generic errors
                        } else {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);
                        }

                    });
                });
            }

            //Returning array
            return objArr;
        }else if (type == "deep"){
            const comp = new Compares();
            var bool = comp.deepCompare(source, target)
            console.log(bool)

            if (bool != true) {
                Object.entries(source).forEach((entry) => {
                    const [key, value] = entry;
                    Object.entries(target).forEach((entry2) => {
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

                        }else if(key === 'string' && Array.isArray(value) === false) {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);
                            this.checkHash('deep',value,value2,objArr)

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
                    const [key, value] = entry;
                    Object.entries(target).forEach((entry2) => {
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

                        }else if(key === 'string' && Array.isArray(value) === false) {
                            const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + value, "Target: " + value2);
                            objArr.push(sourceTarget);
                            this.checkHash('deep',value,value2,objArr)

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











