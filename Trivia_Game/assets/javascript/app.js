


var questionArray = [
    "Which woman was Russia's hopeful for a figure skating Gold Medal in Salt Lake City 2002?",
    "Who were the first ice skating pairs team to lift the woman into the air over the man's head?",
    "Who was the only person Katarina Witt lost the World Championship to between 1983 and 1988?",
    "Who were the women's ice skating medalists at the 1991 World Championships?",
    "Which skating champion had her teeth capped to increase her amount of endorsements?",
    "Who invented the spin in which a skater pulls their free foot above their head during a spin?",
    "When did the USA sweep the ladies' skating medals at the World Championship?",
    "Which female figure skater is married to Rocky Marval, a pairs skater from the United States?"
];
var answerArray = [
    ["Irina Slutskaya", "Angela Nikodinov", "Michelle Kwan", "Oksana Baiul"],
    ["Elena Valova and Oleg Vasiliev", "Frances Dafoe and Norris Bowden", "Ludmila Belousova and Oleg Protopopov", "Elisabeth Schwartz and Kurt Oppelt"],
    ["Kristi Yamaguchi", "Elizabeth Manley", "Debi Thomas", "Jill Trenerey"],
    ["Nancy Kerrigan, Kristi Yamaguchi, Jill Trenery", "Midori Ito, Kristi Yamaguchi, Nancy Kerrigan", "Kristi Yamaguchi, Tonya Harding, Nancy Kerrigan", "Kristi Yamaguchi, Midori Ito, Nancy Kerrigan"],
    ["Tonya Harding", "Jennifer Robinson", "Tara Lipinski", "Nancy Kerrigan"],
    ["Denise Beilmann", "Michelle Kwan", "Karyn Kadavy", "Dorothy Hamill"],
    ["1994", "1991", "1992", "1993"],
    ["Rosalyn Summers", "Denise Beilmann", "Christine Hough", "Isabelle Brasseur"]
];
var correctAnswers = [
    "A. Irina Slutskaya",
    "B. Frances Dafoe and Norris Bowden",
    "C. Debi Thomas",
    "C. Kristi Yamaguchi, Tonya Harding, Nancy Kerrigan",
    "D. Nancy Kerrigan",
    "A. Denise Beilmann",
    "B. 1991",
    "D. Isabelle Brasseur"
];
var questionCounter = 0;
var selecterAnswer;
var theClock;
var correctTally = 0;
var incorrectTally = 0;
var unansweredTally = 0;
var startScreen;
var gameHTML;
var thirtySeconds;
var counter = 30;

$(document).ready(function () {


    function initialScreen() {
        startScreen = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Trivia</a></p>";
        $(".mainArea").html(startScreen);
    }

    initialScreen();


    $("body").on("click", ".start-button", function (event) {
        event.preventDefault();
        generateHTML();
        timerWrapper();

    });

    $("body").on("click", ".answer", function (event) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            console.log("correct answer");
            clearInterval(theClock);
            generateWin();
        }
        else {
            console.log("wrong answer");
            clearInterval(theClock);
            generateLoss();
        }
    });

    $("body").on("click", ".reset-button", function (event) {

        resetGame();
    });

});

function generateLossDueToTimeOut() {
    unansweredTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateWin() {
    correctTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + "img class='center-block img-correct' src='assets/images/correct.jpg'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateLoss() {
    incorrectTally++;
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='assets/images/wrong.jpg'>";
    $(".mainArea").html(gameHTML);
    setTimeout(wait, 4000);
}

function generateHTML() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>A. " + answerArray[questionCounter][0] + "</p><p class='answer'>B. " + answerArray[questionCounter][1] + "</p><p class='answer'>C. " + answerArray[questionCounter][2] + "</p><p class='answer'>D. " + answerArray[questionCounter][3] + "</p>";
    $(".mainArea").html(gameHTML);
}

function wait() {
    if (questionCounter < 7) {
        questionCounter++;
        generateHTML();
        counter = 30;
        timerWrapper();
    }
    else {
        finalScreen();
    }
}

function timerWrapper() {
    theClock = setInterval(thirtySeconds, 1000);
    function thirtySeconds() {
        if (counter === 0) {
            clearInterval(theClock);
            generateLossDueToTimeOut();
        }
        if (counter > 0) {
            counter--;
        }
        $(".timer").html(counter);
    }
}

function finalScreen() {
    gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".mainArea").html(gameHTML);
}

function resetGame() {
    questionCounter = 0;
    correctTally = 0;
    incorrectTally = 0;
    unansweredTally = 0;
    counter = 30;
    generateHTML();
    timerWrapper();
}

