var counter = 0;
$('.nav-bar').on('click',function(){
        counter += 1;
        foo();
})
function foo(){
  
if(counter == 4){
      $("#hidefrom-team").toggleClass('hide-if-team');
        $("#login-with-google").toggleClass('unhide');
}
}