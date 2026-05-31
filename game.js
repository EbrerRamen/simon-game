var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var clickedColors = [];
var gameStart = false;
var level = 0;
var currentIndex = 0;
var nextSequenceTimeout;

$(document).on("keydown", function (event) {
    if (!gameStart && (event.key === "a" || event.key === "A")) {
        if (document.activeElement) {
            document.activeElement.blur();
        }
        gameStart = true;
        nextSequence();
    }
});

function nextSequence() {
    currentIndex = 0;
    clickedColors = [];
    level += 1;
    $("h1").text("Level " + level).removeClass("game-over-text");
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    animatePress("#" + randomChosenColor);

    var audio = new Audio('./sounds/' + randomChosenColor + '.mp3');
    audio.play().catch(function () {});
}


$(".btn").on("click", function () {

    var color = this.id;
    this.blur();

    var audio = new Audio('./sounds/' + color + '.mp3');
    audio.play().catch(function () {});

    animatePress(this);
    if (gamePattern.length === 0) {
        wrongColor();
    } else {

        clickedColors.push(color)
        checkAnswer(currentIndex);
    }
});

function checkAnswer(Index) {
    if (clickedColors[Index] === gamePattern[Index]) {
        currentIndex += 1;
        if (clickedColors.length === gamePattern.length) {
            nextSequenceTimeout = setTimeout(nextSequence, 1000);
        }
    } else {
        wrongColor();
    }
}

function animatePress(button) {
    $(button).addClass("pressed");
    setTimeout(function () {
        $(button).removeClass("pressed");
    }, 150);
}

function wrongColor() {
    clearTimeout(nextSequenceTimeout);
    $("h1").html('Game Over, Press <span class="key-hint">A</span> to Restart').addClass("game-over-text");
    var audio = new Audio('./sounds/wrong.mp3');
    audio.play().catch(function () {});
    $("body").addClass("wrong-flash");
    setTimeout(function () {
        $("body").removeClass("wrong-flash");
    }, 400);
    gameStart = false;
    level = 0;
    gamePattern = [];
}