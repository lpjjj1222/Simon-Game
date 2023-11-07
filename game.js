var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = -1;

function nextSequence(){
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("h1").text("Level "+ String(level));

    
}

$(".btn").click(function handler(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

})

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}


// 任意键触发开始游戏
$(document).on("keydown",function(){
    if(gameStart == false){
        nextSequence();
    }
    gameStart = true;
});

function checkAnswer(currentLevel){
    var lastClick = userClickedPattern[userClickedPattern.length-1];
    var checkIndex = gamePattern[userClickedPattern.length-1];

    if(lastClick == checkIndex){
        console.log("success");
    }
    else{
        console.log("fail");
        var wrongAudio = new Audio("./sounds/wrong.mp3");
        wrongAudio.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
    if(userClickedPattern.length=== gamePattern.length){
        console.log("level finish");
        setTimeout(nextSequence,1000);

    }
}

function startOver(){
    level = -1;
    gamePattern = [];
    gameStart = false;
}



