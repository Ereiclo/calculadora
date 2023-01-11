
let output = document.querySelector('.output');
let botones = document.querySelectorAll('.button');
let per = document.querySelector('.none');
let resultButton = document.querySelector('.button[data-input="="]');
let resetButton = document.querySelector('.reset');
// let status = 'invalid_expression'
let stat; 

function isNumber(c){
    return !isNaN(+c*1);

}

function isOperator(c){
    return c === '+' || c === '-' || c === '/' || c === '*';
}

function isParentesis(c){
    return c === '(' || c === ')';
}


function greaterOrEqualPrecedence(opA,opB){
    if(opA === '*' || opA == '/'){
        return opB === '*' || opB === '/';
    }else if(opA === '+' || opA === '-'){

        return opB === '+' || opB === '-' || opB === '*' || opB === '/' ;
    }
}

function validParentesis(exp){

    let stack = [];

    for(let char of exp){

        if(char === '(')
            stack.push(char)
        else if(char === ')'){
            if(stack.length === 0) {
                return false;

            }

            stack.pop()
        }

    }


    return !Boolean(stack.length);
}

function validDecimals(exp){

    for(let i = 0; i < exp.length; ++i){


        if(exp[i] == '.') return false;

        while(i < exp.length && isNumber(exp[i])) ++i;


        if(i < exp.length && exp[i] == '.'){

            if(i == exp.length - 1 || !isNumber(exp[i+1])) return false;

            ++i;

            while(i < exp.length && isNumber(exp[i])) ++i;

            if(i < exp.length && exp[i] == '.') return false;
        }
        
        
        

        
    }

    return true;

}


function validOperations(exp){
    if(!validParentesis(exp) || !validDecimals(exp)) return false;

    for(let i = 0; i < exp.length; ++i){
        let char = exp[i];

        if(!isNumber(char) && !isOperator(char) &&  !isParentesis(char)
           && char !== '.') return false;

        if(isParentesis(char)){
            if(char === '('){
                if( (i > 0 && (!isOperator(exp[i-1])) || !isNumber(exp[i+1])) ) 
                    return false;
            }
            else if(char === ')'){
                if((i < exp.length - 1 &&  !isOperator(exp[i+1])) || !isNumber(exp[i-1]) )  
                    return false;
            }
        }
        
        
        

        
    }

    return true;
}


function stringToArray(exp){
    let expression = []

    for(let i = 0; i < exp.length;){

        if(!isNumber(exp[i])){
            expression.push(exp[i]);
            ++i;
            continue;
        }

        let actualNum = 0;

        
        while(i < exp.length && isNumber(exp[i])){
            actualNum = actualNum*10 + +exp[i];
            ++i;
        }

        if(i < exp.length && exp[i] === '.'){
            ++i;

            let decimalPart = '';

            while(i < exp.length && isNumber(exp[i])){
                decimalPart +=  exp[i];
                ++i;
            }

            let decimalPlaces = decimalPart.length;

            actualNum += decimalPart/(10**decimalPlaces);
            // console.log(decimalPart/(10**decimalPlaces))
            // actualNum += '.' + decimalPart;


        }

        expression.push(actualNum);


    }

    return expression;


}

function evaluateExpresion(exp){
    exp = exp.replace(/[ ]/g,"")
    if(!validOperations(exp)) return NaN;



    let infix = stringToArray(exp);
    let stack = ['(']
    let postfix = []
    console.log(infix)

    infix.push(')')


    for(let elem of infix){
        if(elem == ')'){
            while(stack.length && stack.slice(-1)[0] != '('){
                let [top] = stack.splice(-1,1);

                postfix.push(top);


            }

            stack.pop();
        }else if(elem == '('){
            stack.push('(')
        }
        else if(isNumber(elem)){
            postfix.push(elem);
        }else if(isOperator(elem)){
            if(stack.slice(-1) != '('){

                while(stack.length && stack.slice(-1)[0] != '('){
                    let [top] = stack.slice(-1);

                    if(greaterOrEqualPrecedence(elem,top)){
                        [top] = stack.splice(-1,1);
                        postfix.push(top);
                    }


                }
                

            }

            stack.push(elem);
        }
    }

    console.log(postfix)


    let result = [];

    for(let elem of postfix){
        if(isOperator(elem)){

            let [a,b] = result.splice(-2,2);
            if(elem === '*'){
                result.push(a*b);
            }else if(elem === '/'){
                result.push(a/b);
            }else if(elem === '+'){
                result.push(a + b);
            }else if(elem === '-'){
                result.push(a-b);
            }
        }else{
            result.push(elem);
        }

    }

    return result[0];
    
    


}

let outputNaN = 0;
let validDot = 0;

function click(e){

    if(outputNaN) {
        output.textContent = '';
        outputNaN = 0;
    }

    console.log(this);

    let dataAttr = this.getAttribute('data-input');

    if(isNumber(dataAttr) && validDot == 0){
        validDot = true

    }else if(isOperator(dataAttr) && validDot == 2){
        validDot = 0;
    }

    if(dataAttr == '.' ){
        if(validDot == 1){
            validDot = 2;
            output.textContent += '.';
        }

    }else{
        output.textContent += dataAttr;
    }





}






for(but of botones){

    but.addEventListener('click',click);


}

per.removeEventListener('click',click)
resultButton.removeEventListener('click',click);
resetButton.removeEventListener('click',click);


resetButton.addEventListener('click',(e) => {
    output.innerHTML = '';
    stat = '';
})


resultButton.addEventListener('click',(e) => {
    let result = evaluateExpresion(output.innerHTML);

    // console.log(result)
    if(isNaN(result)){

        validDot = 0;
        outputNaN = 1;
    }

    output.innerHTML = result.toFixed(2);

})
