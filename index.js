window.addEventListener('load', ()=>{
  const form= document.querySelector("#task-form");
  const input= document.querySelector(".add-item");
  const list= document.querySelector(".posts");
  let indexList=[];
  
  let  number=-1;
  const generate = () => {
    number ++;
    return number;
}


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
      post_div.setAttribute("id", generate());
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
if(post_input_title.readOnly==true)return;
else{
  image.src='';
  post_input_image_container.removeChild(image_cancel);}

});

}

input_image.addEventListener('change', loadFile);
image.addEventListener('click', ()=>
{ if (post_input_title.readOnly==true) return;
else input_image.click()
});
  
//photo


      const post_actions_div= document.createElement("div");  // дів в якому всі кнопочки
      post_actions_div.classList.add("actions");
      post_div.appendChild(post_actions_div);
      console.log(post_div);

      const post_empty_button= document.createElement("button");
      post_empty_button.classList.add("empty");
      post_empty_button.innerHTML ='Draft';
      post_empty_button.setAttribute('disabled', true);
      post_empty_button.setAttribute("value", "Draft");

      const post_edit_button= document.createElement("button");
      post_edit_button.classList.add("edit");
      post_edit_button.innerHTML ='Edit';


      const post_delete_button= document.createElement("button");
      post_delete_button.classList.add("delete");
      post_delete_button.innerHTML = 'Delete';

      const post_save_button= document.createElement("button");
      post_save_button.classList.add("save");
      post_save_button.innerHTML = 'Save';

      const post_input_checkbox= document.createElement("input");
      post_input_checkbox.classList.add("checkbox");
      post_input_checkbox.type = "checkbox";
      post_content_div.appendChild(post_input_checkbox);

       post_actions_div.appendChild(post_empty_button);
      post_actions_div.appendChild(post_edit_button);
      post_actions_div.appendChild(post_save_button);
      post_actions_div.appendChild(post_delete_button);
      post_actions_div.appendChild(post_input_checkbox);
     
      const id=post_div.id;
  
     const item={
        id: id,
        title: post_input_title.value,
        description: post_input_description.value,
        image: image.src,
       }

   post_edit_button.addEventListener('click', ()=>{
                  post_input_title.removeAttribute("readonly");
                  post_input_title.focus();
                  post_input_description.removeAttribute("readonly");
               
            });


      post_delete_button.addEventListener('click', ()=>{
      list.removeChild(post_div);

      indexList = indexList.filter(el => el.id !== post_div.id);
      localStorage.setItem('posts', JSON.stringify(indexList));  
                    })
   

                
 post_save_button.addEventListener('click', ()=>{
    post_input_title.setAttribute("readonly", "readonly");
    post_input_description.setAttribute("readonly", "readonly");  
    if (post_empty_button.value=="Draft"){
    post_empty_button.innerHTML ='Published';
    post_empty_button.setAttribute("value", "Published");
    indexList.push(item);
    }

    item.title=post_input_title.value;
    item.description=post_input_description.value;
    item.image=image.src;
    localStorage.setItem('posts', JSON.stringify(indexList));  

      })
   
       input.value = "";
   
//функція для кнопки, яка видаляє вибрані пости

const chooseDel=document.querySelector('.choose');
chooseDel.addEventListener('click', deletePosts);

function check() {
 let a=document.getElementsByClassName('checkbox');

 let b=document.getElementsByClassName('post');

 let forIdDel=[];
  for (let i = 0; i < a.length; i++) {
     if (a[i].checked){
      forIdDel.push(b[i].id);}
  }

  return forIdDel;
}


function deletePosts()
{
const posts=document.querySelector(".posts");
const list= document.getElementsByClassName("post");
let array=check();


for(let i=0; i<array.length; i++){

  for(let j=0; j<list.length; j++ ){
  if(list[j].id==array[i]){
  posts.removeChild(list[j]);
}
}

indexList = indexList.filter(el => el.id !== array[i]);
localStorage.setItem('posts', JSON.stringify(indexList));  
}
}


     
});
});




function deleteChoosePosts(){
 let buttonCh=document.getElementById('choose');
 let inputMainChoose=document.getElementById('mainChoose');

 if(inputMainChoose.checked){
  buttonCh.style.display='block';
  inputMainChoose.style.marginTop='-40px';
}
else{
  buttonCh.style.display='none';
  inputMainChoose.style.marginTop='0';
}
}
