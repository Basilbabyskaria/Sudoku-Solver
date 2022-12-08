const puzzle_board=document.querySelector('#puzzle');
const solve_btn=document.querySelector('#solve');
const clear_btn=document.querySelector('#clear');

const squares=81;
const submission=[];
for(i=0;i<squares;i++){
    const input_element =document.createElement('input');
    input_element.setAttribute('type','number');
    input_element.setAttribute('min',1);
    input_element.setAttribute('max',9);

    if (
        // % = modulus
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
      ) {
        input_element.classList.add("odd-section");
      }





    puzzle_board.appendChild(input_element);
    
}

const join_values=()=>{
    const inputs=document.querySelectorAll('input');
    inputs.forEach(input=>{
        if (input.value) {
            submission.push(input.value);
            // console.log(input.value);
        }else{
            submission.push('0')
        }
    })

}
const solve=()=>{
    join_values();
    const data=submission;
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '65d1b35afemsh14419ff8d72ab2fp18a445jsn15fbb80422d7',
            'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
        },
        
        body: ` {"input":[${data}]}`
    };
    console.log(options.body);
    fetch('https://sudoku-solver3.p.rapidapi.com/sudokusolver/', options)
        .then(response => response.json())
        .then (response=>populatevalue(response.answer))
        .then(response => console.log(response))
        .catch(err => console.error(err));;
}
const populatevalue=(response)=>{
const input=document.querySelectorAll('input')
if(response){
    input.forEach((input,i)=>{
        input.value=response[i]
    })
}
}
solve_btn.addEventListener('click',solve);
reload=()=>{
location.reload();
}