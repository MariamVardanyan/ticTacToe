let start = document.getElementById('start');
let a = false;
start.addEventListener('click',startGame);
let body = document.querySelector('body')
let gameCounter = 0;
function startGame(){
   let d=false;
   
   if(start.innerHTML == "Start"){
       let table = document.createElement("table");
       table.classList.add('my_table')
       for(let i = 0 ; i < 3 ; i++) {
           rows = document.createElement('tr');
           for( let j = 0 ; j < 3 ; j++){
               columns = document.createElement('td');
               columns.classList.add("col");
               columns.setAttribute('data-col', j+1 );
               columns.setAttribute('data-row' , i+1)
               columns.addEventListener('mousemove' , changeStyle.bind(event,'#D0D371') );
               columns.addEventListener('mouseout' , changeStyle.bind(event,'aliceblue') );
               columns.addEventListener('click' , find_box);
               rows.appendChild(columns)
           }
           table.appendChild(rows)
       } 
       body.appendChild(table)
       start.classList.remove("btn-success");
       start.innerHTML = "Restart"
       start.classList.add("btn-warning");

       table.setAttribute('disabled' , "")
       let winner = document.createElement('p');
       winner.classList.add('winnner-message');
       body.appendChild(winner);
       winner.style.display = "none";
   }
   if(start.innerHTML == "Restart"){
       start.addEventListener('click' , restartGame)
   }
}

   function restartGame(){
       let all_td = document.querySelectorAll('td');
       all_td.forEach(function(td){
           td.removeEventListener('click' , find_box)
           a = false;
           gameCounter = 0;
           td.innerText = "" ;
           td.style.opacity = "1"
           td.addEventListener('click' , find_box)
           const winner =document.querySelectorAll('.winnner-message')[0];
           winner.style.display = "none";
       });
//       // console.log(table)
   }
///my helper functions
   function remove_events(){
       let all_td = document.querySelectorAll('td');
       all_td.forEach(function(td) {
           td.removeEventListener('click' , find_box);
           td.removeEventListener('mousemove' , changeStyle);
           td.removeEventListener('mouseout' , changeStyle)
           td.style.opacity = "0.5"
       })
   }


///who win detect function
       function who_win(e){
           console.log('working')
           const table =document.querySelectorAll('.my_table')[0];
           gameCounter++;
           let col = e.getAttribute('data-col');
           let row = e.getAttribute('data-row');
           let target_col = document.querySelectorAll(`[data-col = "${col}"]`);
           let target_row = document.querySelectorAll(`[data-row = "${row}"]`);
           
           if(target_col[0].innerHTML == target_col[1].innerHTML && target_col[0].innerHTML == target_col[2].innerHTML){
               winnerShow(target_col[0].innerHTML);
               remove_events();
               return;
           }
           
           if(target_row[0].innerHTML == target_row[1].innerHTML && target_row[0].innerHTML == target_row[2].innerHTML){
               winnerShow(target_row[0].innerHTML);
               remove_events();
               return;
           }
         
           if((col == 1 && row == 3) || (col == 3 && row == 1) || (col == 2 && row == 2)){
               if(table.children[0].children[2].innerHTML == table.children[1].children[1].innerHTML && table.children[0].children[2].innerHTML == table.children[2].children[0].innerHTML){
                   winnerShow(table.children[2].children[0].innerHTML);
                   remove_events();
                   return;
               }

           }
           
           if((col == 1 && row == 1) || (col == 3 && row == 3) || (col == 2 && row == 2)){
               if(table.children[0].children[0].innerHTML == table.children[1].children[1].innerHTML && table.children[0].children[0].innerHTML == table.children[2].children[2].innerHTML){
                   winnerShow(table.children[2].children[2].innerHTML);
                   remove_events();
                   return;
               }

           }

           console.log('gameCounter', gameCounter);
           if(gameCounter == 9 ){
                winnerShow(null)
           }
       }




function changeStyle(color, e){
   e.currentTarget.style.backgroundColor = color;
}

       

function find_box(e){
   e.currentTarget.removeEventListener('click',find_box)
   if(a){
       e.currentTarget.innerHTML = "0";
   }else{
       e.currentTarget.innerHTML = "X";
   }
   a = !a;
   who_win( e.currentTarget)
}
function winnerShow(elem){
   const winner =document.querySelectorAll('.winnner-message')[0];
   winner.style.display = "block";
   winner.innerHTML = (elem) ? `Congrat ${elem} win` : 'no winners in this game';
}      

