window.onload = function() {
    const text = document.querySelector("#header-text");
    const buttons = document.querySelectorAll(".btn");
    const numbers =['1','2','3','4','5','6','7','8','9','0'];
    const mathFunc =['ac','del','/','*','-','+','.','equal'];
    const limitExceedText="LIMIT EXCEED"
    let displayText ='0';
    const firstLetterZeroReg =/^0\b/;

    for(var i=0;i<buttons.length;i++){
        buttons[i].addEventListener('click',function(e){

            let attr = this.getAttribute('id');
            // when you are pressing a number button
            if(numbers.includes(attr)){
                if(attr=="0" && lastLetterOfText() =="0" &&displayText.length==1){
                    //if initially it is zero and you are trying to add more zero. it will stop that
                    return;
                }
                if(displayText.match(firstLetterZeroReg) && !containDecimal()){// regular expression is used which is not necessary at all. Just lazy to remove it
                    //If initially it is zero and you press the first button zero is erased
                    displayText =attr;
                    UpdateDisplay();
                    return;
                }
                displayText+=attr;
                UpdateDisplay();
            }
                 //when you are pressing a function button
            else{
           
                // console.log(attr);
                // console.log(displayText);
                if(attr=="ac"){
                    EraseEverything();
                }else if(attr=="del"){
                    //removes the last letter typed
                    console.log("This being called");
                    Del();
                }else if(attr=="equal"){
                    equal();
                } else if(!mathFunc.includes(lastLetterOfText())){
                    //merely checks if we are not pressing the same button twice 
                    displayText+=attr;
                    UpdateDisplay();
                }
            }
        })
    }

    const UpdateDisplay =()=>{

        if(displayText.length>=24 ||text.innerHTML==limitExceedText){
            displayText =limitExceedText;
            text.innerHTML = displayText;
        }
        if(displayText.length>=12){
            let textarr = displayText.split('');
            let xdisplayText =textarr.slice(textarr.length%12);
            console.log(xdisplayText);
            text.innerHTML =xdisplayText.join('');
        }else{
            text.innerHTML = displayText;
        }
    } 

    const lastLetterOfText = ()=> displayText[displayText.length-1];
    const containDecimal =()=>{
        let xdisplayText= displayText.replace(/[-+*/]/g," ");
        let arr=xdisplayText.split(' ');
        for(var i=0;i<arr.length;i++){
            let newarr=arr[i].split('');
            if(newarr.includes(".")){
                return true;
            }
        }
        return false;
    }
    const EraseEverything = ()=>{
        displayText='0';
        text.innerHTML = displayText;
    }
    const Del= ()=>{
        //removes the last type letter
        if(text.innerHTML!=limitExceedText){
            let xdisplayText = displayText.split('');
            xdisplayText = xdisplayText.slice(0,xdisplayText.length-1);
            if(xdisplayText.length!=0){
                displayText = xdisplayText.join('');
            }else{
                displayText='0';
            }
            text.innerHTML = displayText;
        }
    }
    const equal = ()=>{
        let number = eval(displayText);
        if(number%1!=0){
            number=parseFloat(number).toFixed(3);
        }
        displayText = String(number);
        text.innerHTML=displayText;
    }
}
