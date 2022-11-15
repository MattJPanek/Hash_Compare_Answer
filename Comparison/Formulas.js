import SourceTarget from './../DataObjects/SourceTarget.js'

/**
 * Class Compare
 * This contains all the logic that is used for the Hash Compare
 * Contains:
 * 1. shallowCompare - This will return an Object List of differences between the source and target
 * 2. deepCompare - This will return an Object List of differences between the source and target
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
        } else if (typeof source === "object" && Array.isArray(source) === false) {
            if (Object.keys(source).length !== Object.keys(target).length) {
                return false;
            }
            return Object.keys(source).every((key) =>
                this.deepCompare(source[key], target[key])
            );
        }

        return source === target;

    }

}

/**
 * Class Formulas
 * This contains all the logic that is used listing differences
 * Contains:
 * 1. checkHash - This will return a success message or an array of errors
 *
 */

export default class Formulas {

    checkHash(type, source, target, objArr) {
        if (type == "shallow") {
            const comp = new Compares();
            var bool = comp.shallowCompare(source, target)

            if (bool != true) {
                if (Object.keys(source).length < Object.keys(target).length) {
                    const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(source) + " Source Values: " + Object.values(source), "Target Keys: " + Object.keys(target) + " Target Values: " + Object.values(target));
                    objArr.push(sourceTarget);
                } else if (Object.keys(source).length > Object.keys(target).length) {
                    const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(source) + " Source Values: " + Object.values(source), "Target Keys: " + Object.keys(target) + " Target Values: " + Object.values(target));
                    objArr.push(sourceTarget);


                }

                Object.entries(source).forEach((entry) => {
                    Object.entries(target).forEach((entry2) => {
                        const [key, value] = entry;
                        const [key2, value2] = entry2;

                        //If Key values do not match
                        if (key !== key2 && value === value2) {
                            const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                            objArr.push(sourceTarget);

                            //If key is not a string
                        } else if (typeof key !== 'string' && value === value2) {
                            const sourceTarget = new SourceTarget("Key Value aren't strings", "Source: " + key, "Target: " + key2);
                            objArr.push(sourceTarget);

                            //If the values don't match, recording the difference
                        } else if (key === key2 && typeof value === 'string') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("String Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);

                            }
                            //Checking if the type is a Number
                        } else if (key === key2 && typeof value === 'number') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);

                            }

                            //Checking if the type is a Boolean
                        } else if (key === key2 && typeof value === 'boolean') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);

                            }

                            //Checking if the type is an array
                        } else if (key === key2 && Array.isArray(value)) {

                            if (Object.keys(value).length < Object.keys(value2).length) {
                                const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value) + " Source Values: " + Object.values(value), "Target Keys: " + Object.keys(value2) + " Target Values: " + Object.values(value2));
                                objArr.push(sourceTarget);
                            } else if (Object.keys(value).length > Object.keys(value2).length) {
                                const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value) + " Source Values: " + Object.values(value), "Target Keys: " + Object.keys(value2) + " Target Values: " + Object.values(value2));
                                objArr.push(sourceTarget);


                            } else {
                                const sourceIndex = value;
                                const targetIndex = value2;

                                //Comparing the values of each array, recording the difference
                                for (var i = 0; i < sourceIndex.length; i++) {
                                    for (var j = 0; j < targetIndex.length; j++) {
                                        if (sourceIndex.length === targetIndex.length) {
                                            if (i === j && sourceIndex[i] !== targetIndex[j]) {
                                                const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex[i], "Target: " + targetIndex[j]);
                                                objArr.push(sourceTarget);

                                            }
                                        } else {
                                            if (sourceIndex.length < targetIndex.length) {
                                                const sourceTarget = new SourceTarget("Values Missing in Source Array: ", targetIndex[j]);
                                                objArr.push(sourceTarget);
                                            } else {
                                                const sourceTarget = new SourceTarget("Values Missing in Target Array: ", sourceIndex[j]);
                                                objArr.push(sourceTarget);
                                            }
                                        }
                                    }
                                }
                            }


                        } else {
                            //If Key values do not match
                            if (key !== key2 && value === value2) {
                                const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                                objArr.push(sourceTarget);

                                //If key is not a string
                            } else if (typeof key !== 'string' && value === value2) {
                                const sourceTarget = new SourceTarget("Key Value aren't strings", "Source: " + key, "Target: " + key2);
                                objArr.push(sourceTarget);

                                //If the values don't match, recording the difference
                            } else if (key === key2 && typeof value === 'string') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("String Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);

                                }
                                //Checking if the type is a Number
                            } else if (key === key2 && typeof value === 'number') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);

                                }

                                //Checking if the type is a Boolean
                            } else if (key === key2 && typeof value === 'boolean') {
                                if (value !== value2) {
                                    const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                    objArr.push(sourceTarget);

                                }

                                //Checking if the type is an array
                            } else if (key === key2 && Array.isArray(value)) {


                                if (Object.keys(value).length < Object.keys(value2).length) {
                                    const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value) + " Source Values: " + Object.values(value), "Target Keys: " + Object.keys(value2) + " Target Values: " + Object.values(value2));
                                    objArr.push(sourceTarget);
                                } else if (Object.keys(value).length > Object.keys(value2).length) {
                                    const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value) + " Source Values: " + Object.values(value), "Target Keys: " + Object.keys(value2) + " Target Values: " + Object.values(value2));
                                    objArr.push(sourceTarget);


                                } else {
                                    const sourceIndex = value;
                                    const targetIndex = value2;

                                    //Comparing the values of each array, recording the difference
                                    for (var i = 0; i < sourceIndex.length; i++) {
                                        for (var j = 0; j < targetIndex.length; j++) {
                                            if (sourceIndex.length === targetIndex.length) {
                                                if (i === j && sourceIndex[i] !== targetIndex[j]) {
                                                    const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex[i], "Target: " + targetIndex[j]);
                                                    objArr.push(sourceTarget);

                                                }
                                            } else {

                                            }
                                        }
                                    }
                                }
                            }

                        }


                    });
                });

                //Returning array
                return objArr;
            } else {

            }
            //Returning Success Message
            return "Successful Match";
        } else if (type == "deep") {
            const comp = new Compares();
            var bool = comp.deepCompare(source, target)

            if (bool != true) {

                if (Object.keys(source).length < Object.keys(target).length) {
                    const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(source) + " Source Values: " + Object.values(source), "Target Keys: " + Object.keys(target) + " Target Values: " + Object.values(target));
                    objArr.push(sourceTarget);
                } else if (Object.keys(source).length > Object.keys(target).length) {
                    const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(source) + " Source Values: " + Object.values(source), "Target Keys: " + Object.keys(target) + " Target Values: " + Object.values(target));
                    objArr.push(sourceTarget);

                }

                Object.entries(source).forEach((entry) => {
                    Object.entries(target).forEach((entry2) => {
                        const [key, value] = entry;
                        const [key2, value2] = entry2;


                        //Checking if key values are correct
                        if (typeof key === 'string' && key !== key2 && value === value2) {
                            const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + key2);
                            objArr.push(sourceTarget);

                            //If key is not a string
                        } else if (typeof key !== 'string' && value === value2) {
                            const sourceTarget = new SourceTarget("Key Value aren't strings", "Source: " + key, "Target: " + key2);
                            objArr.push(sourceTarget);

                            //If the values don't match, recording the difference
                        } else if (key === key2 && typeof value === 'string') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("String Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }
                            //Checking if the type is a Number
                        } else if (key === key2 && typeof value === 'number') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                            //Checking if the type is a Boolean
                        } else if (key === key2 && typeof value === 'boolean') {
                            if (value !== value2) {
                                const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value, "Target: " + value2);
                                objArr.push(sourceTarget);
                            }

                            //Checking if the type is an array
                        } else if (key === key2 && Array.isArray(value)) {

                            if (Object.keys(value).length < Object.keys(value2).length) {
                                const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value) + " Source Values: " + Object.values(value), "Target Keys: " + Object.keys(value2) + " Target Values: " + Object.values(value2));
                                objArr.push(sourceTarget);
                            } else if (Object.keys(value).length > Object.keys(value2).length) {
                                const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value) + " Source Values: " + Object.values(value), "Target Keys: " + Object.keys(value2) + " Target Values: " + Object.values(value2));
                                objArr.push(sourceTarget);


                            } else {
                                const sourceIndex = value;
                                const targetIndex = value2;

                                //Comparing the values of each array, recording the difference
                                for (var i = 0; i < sourceIndex.length; i++) {
                                    for (var j = 0; j < targetIndex.length; j++) {
                                        if (sourceIndex.length === targetIndex.length) {
                                            if (i === j && sourceIndex[i] !== targetIndex[j]) {
                                                const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex[i], "Target: " + targetIndex[j]);
                                                objArr.push(sourceTarget);

                                            }
                                        } else {
                                        }
                                    }
                                }
                            }


                        } else if (key === key2 && Array.isArray(value) === false && typeof value === 'object') {
                            Object.entries(value).forEach((entry3) => {
                                Object.entries(value2).forEach((entry4) => {
                                    const [key3, value3] = entry3;
                                    const [key4, value4] = entry4;

                                    if (key3 !== key4 && value3 === value4) {
                                        const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key3, "Target: " + key4);
                                        objArr.push(sourceTarget);

                                        //If the values don't match, recording the difference
                                    } else if (key3 === key4 && typeof value3 === 'string') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("String Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is a Number
                                    } else if (key3 === key4 && typeof value3 === 'number') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is a Boolean
                                    } else if (key3 === key4 && typeof value3 === 'boolean') {
                                        if (value3 !== value4) {
                                            const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + value3, "Target: " + value4);
                                            objArr.push(sourceTarget);
                                        }

                                        //Checking if the type is an array
                                    } else if (key3 === key4 && Array.isArray(value3)) {

                                        if (Object.keys(value3).length < Object.keys(value4).length) {
                                            const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value3) + " Source Values: " + Object.values(value3), "Target Keys: " + Object.keys(value4) + " Target Values: " + Object.values(value4));
                                            objArr.push(sourceTarget);
                                        } else if (Object.keys(value3).length > Object.keys(value4).length) {
                                            const sourceTarget = new SourceTarget("Difference detect in hash length.", "Source Keys: " + Object.keys(value3) + " Source Values: " + Object.values(value3), "Target Keys: " + Object.keys(value4) + " Target Values: " + Object.values(value4));
                                            objArr.push(sourceTarget);


                                        } else {
                                            const sourceIndex2 = value3;
                                            const targetIndex2 = value4;

                                            //Comparing the values of each array, recording the difference
                                            for (var i = 0; i < sourceIndex2.length; i++) {
                                                for (var j = 0; j < targetIndex2.length; j++) {
                                                    if (i === j && sourceIndex2[i] !== targetIndex2[j]) {
                                                        const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + sourceIndex2[i], "Target: " + targetIndex2[j]);
                                                        objArr.push(sourceTarget);
                                                    }
                                                }
                                            }
                                        }
                                    } else if (key3 === key4 && Array.isArray(value3) === false && typeof value3 === 'object') {
                                        this.checkHash('deep', value3, value4, objArr)
                                    }
                                });
                            });
                        }


                    });
                });

                //Returning Error array
                return objArr;

            } else {

                //Returning Success Message
                return "Successful Match";

            }

        }

    }
}











