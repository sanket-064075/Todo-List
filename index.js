 let todoListContEl = document.getElementById("todoListCont");

 let userInEl = document.getElementById("userIn");

 let errorMsg = document.getElementById("errorMsg");

 

 




//  let todoList = [
             
//       {
//          title : "HTML",id : 1
//       },
//       {
//          title : "CSS",id : 2
//       },
//       {
//          title : "JS",id : 3
//       }



//    ] 


 function onGetparsedtodo(){

 let myTodoList = localStorage.getItem("myTodoList");

if (myTodoList === null){

      return [];
}
else{

  let parsedTodo = JSON.parse(myTodoList);

  return parsedTodo;

}

 }


let todoList = onGetparsedtodo()







     function onStatusChanged(checkBoxId,titleId,todoId){
    

      let checkBoxEl = document.getElementById(checkBoxId);

      let titleEl = document.getElementById(titleId);

      

     if (checkBoxEl.checked === true ){

         titleEl.classList.add("checked");

     }
     else
     {
      titleEl.classList.remove("checked");

     }


     let newTodoId = todoId.slice(4);


     let index = todoList.findIndex((each)=> each.id == newTodoId);

     for(let i = 0; i< todoList.length; i++){

       if( index === i){

        if(todoList[i].isChecked === false){

          todoList[i].isChecked = true;
        }
        else{
              todoList[i].isChecked = false;

        }

       }

     }



     }



function onDeletTodo(todoId){

   let myTodo = document.getElementById(todoId);

   todoListContEl.removeChild(myTodo);

  let newTodoId = todoId.slice(4);


  let index = todoList.findIndex((each)=> each.id == newTodoId);

 todoList.splice(index,1);

 console.log(todoList);

}


 function createAndAppendTodo(todo){



   let checkBoxId = "myCheckbox" + todo.id;
   let titleId = "myTitle" + todo.id;
   let todoId = "todo" + todo.id;


    let listCont = document.createElement("li");
    listCont.classList.add("list-cont");
    listCont.id = todoId;
    todoListContEl.appendChild(listCont);

      let checkboxEl = document.createElement("input");
      checkboxEl.type = "checkbox"
      checkboxEl.id = checkBoxId
      if(todo.isChecked === true){
     
         checkboxEl.checked = true;

      }
      checkboxEl.onclick = function(){

          onStatusChanged(checkBoxId,titleId,todoId);

      }
      listCont.appendChild(checkboxEl);

      let lableEl = document.createElement("label");
      lableEl.classList.add("label-card");
      lableEl.htmlFor = checkBoxId
      listCont.appendChild(lableEl);

      let titleEl = document.createElement("h3");
      titleEl.textContent = todo.title;
      titleEl.id =  titleId;
      if(todo.isChecked === true){
        titleEl.classList.add("checked");
      }
      lableEl.appendChild(titleEl);

      let deleteBtnEl = document.createElement("button");
      deleteBtnEl.classList.add("delete-btn");
      deleteBtnEl.onclick = function(){
        
          onDeletTodo(todoId);

      }
      lableEl.appendChild(deleteBtnEl);

      let trashIconEl = document.createElement("i");
      trashIconEl.classList.add("fa-solid","fa-trash");
      deleteBtnEl.appendChild(trashIconEl);


 }




 for  ( each of todoList ){

   createAndAppendTodo(each);

 }




 function onAddTodo(){

     

      let date = new Date();

      let uniqueId = Math.ceil(Math.random() * date.getTime())

     console.log(uniqueId );

      let newTodo = {
          title : userInEl.value,
          id : uniqueId,
          isChecked : false
       }

 if (userInEl.value === ""){

   errorMsg.textContent =  "please provide valid inpit!!!!";

 }
else{

    createAndAppendTodo( newTodo );
    todoList.push(newTodo);
    errorMsg.textContent =  "";
    userInEl.value = "";

}

 console.log( todoList.length);

 }



 function onSavetodo(){



     let stringfyTodo = JSON.stringify(todoList);

     localStorage.setItem("myTodoList",stringfyTodo);

 }