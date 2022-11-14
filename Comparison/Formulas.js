import SourceTarget from "DataObjects";
/**
 * Class Formulas
 * This contains all the logic that is used for the Hash Compare
 * Contains:
 * 1. checkIfShallow - This return true or false based on if two hashes are the same
 * 2. shallowCompare - This will return an Object List of differences between the source and target
 * 3. deepCompare - This will return an Object List of differences between the source and target
 */

class Formulas {

    checkIfShallow(source, target) {

        //Checking if the types are correct
        if (typeof source !== typeof target) {
            return false;
        }

        //Checking if the type is an Object aka Hash
        if (typeof source === 'object' && Array.isArray(source) == false) {
            return Object.keys(source).every((key) => source[key] === target[key]);

        }

        return source === target;

    }

    shallowCompare(source, target) {

        let objArr = [];

        //Checking if the types are correct
        if (typeof source !== typeof target) {
            const sourceTarget = new SourceTarget("Value Types Do Not Match", "Source: " + source, "Target: " + target);
            objArr.push(sourceTarget);
        }
            //Checking if Hash is an object
       if (typeof source === 'object' && Array.isArray(source) === false) {
            Object.keys(source).every((key) => {
                Object.keys(target).every((tKey) => {
                //If the values don't match, recording the difference
                if(source[key] !== target[key]) {
                    const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + source[key], "Target: " + target[key]);
                    objArr.push(sourceTarget);
                   
                    //Checking if key values are correct
                }else if (key !== tKey) {
                    const sourceTarget = new SourceTarget("Key Values Do Not Match", "Source: " + key, "Target: " + tKey);
                    objArr.push(sourceTarget);

                }else if (key === 'string' && Array.isArray(source[key])) {

                        //If the array hash is not the same
                        if (source[key].length !== target[key].length) {
                            const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + source[key].length, "Target: " + target[key].length);
                            objArr.push(sourceTarget);

                        } else {
                            const sourceIndex = source[key];
                            const targetIndex = target[key];

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

                    //Checking if the type is a Number
                }else if (key === 'string' && typeof source[key] === 'number') {

                    //If the values don't match, recording the difference
                    if (source[key] !== target[key]) {
                        const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + source[key], "Target: " + target[key]);
                        objArr.push(sourceTarget);
                    }

                    //Checking if the type is a String
                } else if (key === 'string' && typeof source[key] === 'string') {

                    //If the values don't match, recording the difference
                    if(source[key] !== target[key]){
                        const sourceTarget = new SourceTarget("String Values Do Not Match", "Source: " + source[key], "Target: " + target[key]);
                        objArr.push(sourceTarget);
                    }

                    //Checking if the type is a Boolean
                } else if (key === 'string' && typeof source[key] === 'boolean') {

                    //If the values don't match, recording the difference
                    if(source[key] !== target[key]){
                        const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + source[key], "Target: " + target[key]);
                        objArr.push(sourceTarget);
                    }

                }else{
                }

                });
            });

        return objArr;

    }


    deepCompare(source, target) {

        let objArr = [];

        //Checking if the types are correct
        if (typeof source !== typeof target) {
            const sourceTarget = new SourceTarget("Value Types Do Not Match", "Source: " + source, "Target: " + target);
            objArr.push(sourceTarget);
        }

        //Checking if the type is an Array
        if (typeof source === 'object' && Array.isArray(source)) {

            //If the lengths don't match, recording the difference
            if (source.length != target.length) {
                const sourceTarget = new SourceTarget("Array Length Do Not Match", "Source: " + source.length, "Target: " + target.length);
                objArr.push(sourceTarget);
            }
            else {

                //Comparing the values of each array, recording the difference
                for (var i = 0; i < source.length; i++) {
                    for (var j = 0; j < target.length; j++) {
                        if (source[i] != source[j]) {
                            const sourceTarget = new SourceTarget("Array Values Do Not Match", "Source: " + source[i], "Target: " + target[j]);
                            objArr.push(sourceTarget);

                    //Using Recursion to call back function
                        }else{
                            objArr = objArr.concat(deepCompare(source[i],target[i]));
                        }

                    }

                }
            }

            //Checking if the type is an Object
        }
            else if (typeof source === 'object' && Array.isArray(source) == false) {
            Object.keys(source).every((key) => {

                //If the values don't match, recording the difference
                if(source[key] != target[key]) {
                    const sourceTarget = new SourceTarget("Object Values Do Not Match", "Source: " + source[key], "Target: " + target[key]);
                    objArr.push(sourceTarget);
                }else{
                    objArr = objArr.concat(deepCompare(source[key],target[key]));
                }
            });


            //Checking if the type is a Number
        } else if (typeof source === 'number') {

            //If the values don't match, recording the difference
            if(source != target){
                const sourceTarget = new SourceTarget("Numeric Values Do Not Match", "Source: " + source, "Target: " + target);
                objArr.push(sourceTarget);
            }

            //Checking if the type is a String
        } else if (typeof source === 'string') {

            //If the values don't match, recording the difference
            if(source != target){
                const sourceTarget = new SourceTarget("String Values Do Not Match", "Source: " + source, "Target: " + target);
                objArr.push(sourceTarget);
            }

            //Checking if the type is a Boolean
        } else if (typeof source === 'boolean') {

            //If the values don't match, recording the difference
            if(source != target){
                const sourceTarget = new SourceTarget("Boolean Values Do Not Match", "Source: " + source, "Target: " + target);
                objArr.push(sourceTarget);
            }
        }

        return objArr;




    }


}
