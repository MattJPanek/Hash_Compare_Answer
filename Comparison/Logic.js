import Formulas from "Comparison";


class Logic{

    compare(source,target){
        let objArr = [];
        const formula = new Formulas();
    if(formula.checkIfShallow(source,target) == false){

        let objArr = deepCompare(source, target);

    }else{

        let objArr = shallowCompare(source, target);

    }

        return objArr;
    }


}