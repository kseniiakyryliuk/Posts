window.addEventListener('load', ()=>{
  const form= document.querySelector("#task-form");
  const input= document.querySelector(".add-item");
  const list= document.querySelector(".posts");
  
 form.addEventListener('submit', (e)=>{
      e.preventDefault();
     
      let error=document.querySelector('.error');
      
 
     //помилка
      const post = input.value;
      if (!post) {
        error.style.display='block';
         return;
      }  
      else{
        error.style.display='none';
      }

     //кнопка добавити

      const post_div = document.createElement("div");   // дів в якому весь пост
      post_div.classList.add("post");
      list.appendChild(post_div);


      const post_content_div = document.createElement("div");
      post_content_div.classList.add("content");
      post_div.appendChild(post_content_div);
            

      const post_input_title= document.createElement("input");
      post_input_title.classList.add("text");
      post_input_title.type = "text";
      post_input_title.value= post;
      post_input_title.setAttribute("readonly", "readonly");
      post_content_div.appendChild(post_input_title);

      const post_input_description= document.createElement("input");
      post_input_description.classList.add("text");
      post_input_description.type = "text";
      post_input_description.value= '';
      post_input_description.setAttribute("readonly", "readonly");
      post_content_div.appendChild(post_input_description);



/*photo div*/
      const post_input_image_container= document.createElement("div");
      post_input_image_container.classList.add("container");
     
       
      const image=document.createElement("img");
      image.src="";
      image.setAttribute("id","chosen-image");
      post_input_image_container.appendChild(image);

     const input_image=document.createElement("input");
            input_image.type = "file";
            input_image.setAttribute("hidden", "true");
            input_image.classList.add("upload-button");
             input_image.setAttribute("accept", "image/*");
       post_input_image_container.appendChild(input_image);

       post_content_div.appendChild(post_input_image_container);


//photo|
const loadFile=(e)=>{
const file=e.target.files[0];
  if(!file) return;
  else{
image.src=URL.createObjectURL(file);
cancelImage();
  }}


const cancelImage=()=>{
const image_cancel=document.createElement("button");
image_cancel.innerHTML='<img src="cancel.png" width=35px>';
image_cancel.setAttribute("id","cancel-image");
post_input_image_container.appendChild(image_cancel);

image_cancel.addEventListener('click', ()=>{
  image.src='';
  post_input_image_container.removeChild(image_cancel);
});

}
input_image.addEventListener('change',loadFile);
image.addEventListener('click', ()=>input_image.click());
  
//photo


      const post_actions_div= document.createElement("div");  // дів в якому всі кнопочки
      post_actions_div.classList.add("actions");
      post_div.appendChild(post_actions_div);
    console.log(post_div);

      const post_edit_button= document.createElement("button");
      post_edit_button.classList.add("Edit");
      post_edit_button.innerHTML ='Edit';


      const post_delete_button= document.createElement("button");
      post_delete_button.classList.add("Delete");
      post_delete_button.innerHTML = 'Delete';

      const post_save_button= document.createElement("button");
      post_save_button.classList.add("Save");
      post_save_button.innerHTML = 'Save';

      const post_input_checkbox= document.createElement("input");
      post_input_checkbox.classList.add("checkbox");
      post_input_checkbox.type = "checkbox";
      post_content_div.appendChild(post_input_checkbox);

      post_actions_div.appendChild(post_edit_button);
      post_actions_div.appendChild(post_save_button);
      post_actions_div.appendChild(post_delete_button);
      post_actions_div.appendChild(post_input_checkbox);
      

      post_edit_button.addEventListener('click', ()=>{
                         post_input_title.removeAttribute("readonly");
                  post_input_title.focus();
                  post_input_description.removeAttribute("readonly");
       });

      post_delete_button.addEventListener('click', ()=>{
              list.removeChild(post_div);
                 })
   
      post_save_button.addEventListener('click', ()=>{
        post_input_title.setAttribute("readonly", "readonly");
              post_input_description.setAttribute("readonly", "readonly");
             
      })
       input.value = "";
 
  });
});


function deleteChoosePosts(){
 const choose=document.getElementById('choose');
 let inputMainChoose=document.getElementById('mainChoose')
 if(inputMainChoose.checked){
  choose.style.display='block';
  inputMainChoose.style.marginTop='-40px';
}
else{
  choose.style.display='none';
  inputMainChoose.style.marginTop='0';
}
}



function check() {
  let a=document.getElementsByClassName('checkbox');
 let empty=[];

  for (let index = 0; index < a.length; index++) {
     if (a[index].checked)
     empty.push(a[index]);
    
  }
  return empty;
}


function del(){
let array=check();
for(let i=0; i<array.length; i++){
array[i].parentNode.parentNode.remove();

}}




