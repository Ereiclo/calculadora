
let output = document.querySelector('.output');
let botones = document.querySelectorAll('.button');
let per = document.querySelector('.none');
let resultButton = document.querySelector('.button[data-number="="]');
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


function validOperations(exp){
    if(!validParentesis(exp)) return false;

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



function evaluateExpresion(exp){
    // exp = exp.replace(/[ ]/g,"")



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

    console.log(expression);

    



    
    

    stat = 'valid_expression'



}

function click(e){
    console.log(this);

    output.textContent += this.innerHTML;



}






for(but of botones){

    but.addEventListener('click',click);


}

per.removeEventListener('click',click)
resultButton.removeEventListener('click',click);
resetButton.removeEventListener('click',click);


resetButton.addEventListener('click',(e) => {
    output.innerHTML = ''
    stat = '';
})
