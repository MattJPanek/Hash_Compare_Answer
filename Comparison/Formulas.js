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

        if (typeof source === "object" && Array.isArray(source) === false) {

            return Object.keys(source).every((key) => source[key] === target[key]);
        } else {
            return false;
        }

        return source === target;
    }

    deepCompare(source, target) {
        if (typeof source !== typeof target) {
            return false;
        }
        if (typeof source === "object") {
            if (Object.keys(source).length !== Object.keys(target).length) {
                return false;
            }

            return Object.keys(source).every((key) =>
                this.deepCompare(source[key], target[key])
            );
        } else {
            return false;
        }

        return source === target;

    }

}

export default class Formulas {

    checkHash(type, source, target) {
        let objArr = [];
        if (type == "shallow") {
            const comp = new Compares();
            var bool = comp.shallowCompare(source, target)

            if (bool != true) {
                Object.entries(source).forEach((entry) => {
                    const [key, value] = entry;
                    Object.entries(target).forEach((entry2) => {
                        const [key2, value2] = entry2;




                    });
                });

            } else {
                Object.entries(source).forEach((entry) => {
                    const [key, value] = entry;
                    Object.entries(target).forEach((entry2) => {
                        const [key2, value2] = entry2;



                        
                    });
                });

            }
        }

    }
}





