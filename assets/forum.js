//var socket = io.connect('http://localhost:3000')
var socket = io.connect('https://getma3.herokuapp.com')

var forum_btn =  document.getElementById('forum-post-btn');
var frm_post =   document.getElementById('forum-input');
var username =   document.getElementById('user-name').value;
var ul = document.getElementById('posts');
forum_btn.addEventListener('click',function(){
    socket.emit('forum-post',{body:frm_post.value,user:username,date:new Date()});
})


socket.on('feedHistory',function(post_data){
    ul.innerHTML =``;
    post_data.forEach((post_data)=>{
    let newDate = new Date(post_data.date);
    let hrs = newDate.getHours();
    let mins = newDate.getMinutes();
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    let timestamp ="<br>"+ hrs+":"+mins+"<br>"+date+"/"+month+"/"+year
    ul.innerHTML += 
    `
    <li>
    ${post_data.body}
    <p>${post_data.user} ${timestamp}</p>
    </li>
   
    `
})
 })

socket.on('forum-post',function(post_data){
    frm_post.value = "";
    let newDate = new Date(post_data.date);
    let hrs = newDate.getHours();
    let mins = newDate.getMinutes();
    let date = newDate.getDate();
    let month = newDate.getMonth()+1;
    let year = newDate.getFullYear();
    let timestamp ="<br><br>"+ hrs+":"+mins+"<br>"+date+"/"+month+"/"+year
    ul.innerHTML += 
    `
    <li>
    ${post_data.body}
    <p>${post_data.user} ${timestamp}</p>
    </li>
   
    `
})

