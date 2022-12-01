buttonColours = ["red", "blue", "green", "yellow"];

gamePattern = [];
userClickedPattern = [];

var level = 0;
var started = false;


$(document).keypress(function(){
    if (!started){
        $("#level-title").html("Level " + level);
        nextSequence();
        started = true;
    }
})


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){  
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        var audioWrong = new Audio("sounds/wrong.mp3");
        audioWrong.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over"); 
        }, 200);
        $("#level-title").html("Game Over, Press Any Key to Restart");
        startOver();   
    }
}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}


function playSound(name){
    var audio = new Audio("sounds/" +  name + ".mp3");
    audio.play();
}


function animatePress(currentColour){
    var currentColour = $("#" + currentColour);
    currentColour.addClass("pressed");
    setTimeout(function(){
        currentColour.removeClass("pressed")
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}