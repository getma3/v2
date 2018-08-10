$(document).ready(function(){
    // Fetch stage data
    $.ajax({
        method:'GET',
        url:'https://getma3.herokuapp.com/api/v1/stages/all',
        dataType:'json'
    }).done(function(result){
       $.map(result.response.data,function(stage){
         $('#data-feed').append(`
         <a target="_blank" href="https://www.google.com/maps/place/${stage.location[0]},${stage.location[1]}"><div class="data-result">
            <p><strong>Stage Name: </strong>${stage.name}</p>
            <p><strong>Description: </strong>${stage.desc}</p>
            <p><strong>Nearby: </strong>${stage.nearby}</p></a>
         `);
        })
       })
       // Fetch Team members
       $.ajax({
        method:'GET',
        url:'https://getma3.herokuapp.com/team/teammembers',
        dataType:'json'
    }).done(function(result){
       $.map(result,function(member){
           console.log(member);
         $('#team-feed').append(`
         <div class="data-result">
            <p style="display:inline-block"><strong></strong>${member.username}</p>
            <img style="display:inline-block; border-radius:50%" src="${member.thumb}"/>
         `);
        })
       })
    })