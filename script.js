// Initialise data storage (list) here
// A list that holds multiple dictinaries (key-value pairs)
const database = [
    {
        question : "What is the cpital of Japan?",
        options : ["Nagoya", "Hokkaido", "Tokyo", "Kyoto"],
        answer : "Tokyo"
    },

    {
        question : "What is the tallest mountain in SG?",
        options : ["Mount Faber", "Bukit Batok", "Jurong Hill", "Bukit Timah Hill"],
        answer : "Bukit Timah Hill"
    },

    {
        question : "In which year did the Titanic sink?",
        options : ["1912", "1920", "1922", "1924"],
        answer : "1912"
    },

    {
        question : "Which year was iPhone first launched?",
        options : ["2005", "2005", "2006", "2007"],
        answer : "2007"
    },

    {
        question : "Which company invented the Chat-GPT?",
        options : ["IMB", "Nvidia", "Tesla", "OpenAI"],
        answer : "OpenAI"
    },
];

// Idedntify all HTML components that we want to controle
const questionElement = document.getElementById('question');
const startButton = document.getElementById('start-btn');
const timerText = document.getElementById('countdownText');
const progressBarFill = document.getElementById('progress-bar-fill');
const optionContainer = document.getElementById('option-container');
const resultLabel = document.getElementById('result');
const FeedbackLable = document.getElementById('feedback');
const progressBarContainer = document.getElementById('progress-bar-container');
const timerElement = document.getElementById('timer');

progressBarFill.style.width = '0%';
FeedbackLable.textContent = "";

let currentQuestionNo = 0;
let timer = 0;
let score = 0;


startButton.addEventListener('click', startQuiz);

function startQuiz()
{
    startButton.style.display = 'none'; // to hide the start button
    loadNextQuestion();
}

function loadNextQuestion() 
{

    //Reset Time
    clearInterval(timer);

    if(currentQuestionNo < database.length)
    {
        // Update progress bar
        progressBarFill.style.width = `${((currentQuestionNo + 1) / database.length) * 100}%`;

        // Set initial countdown value
        timerText.textContent = 15;

        const currentQuestionSet = database[currentQuestionNo];
        questionElement.textContent = currentQuestionSet.question;

        // Remove all previous button clones
        optionContainer.innerHTML = '';

        // clone 4 opyion buttons for a question
        currentQuestionSet.options.forEach((option) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            optionContainer.appendChild(button);

            button.addEventListener('click', () => {
                disableOptionButtons();
                checkAnswer(option);
            });
        });   

        //re-enable option buttons
        enableOptionButtons();

        // Start the countdown timer
        // Define in {} what to do when timer fires
        timer = setInterval(() => {
            timerText.textContent = parseInt(timerText.textContent) - 1;
            if(parseInt(timerText.textContent) === 0)
            {
                // reset timer
                clearInterval(timer);

                currentQuestionNo = currentQuestionNo + 1;

                loadNextQuestion();
            }
        }, 1000);
    } else
    {
        EndQuiz();
    }
}

function checkAnswer(option) {
    // Retrieve answer key of a question set
    const answer = database[currentQuestionNo].answer;

    if (option === answer)
    {
        score = score + 1;
    }

    resultLabel.textContent = `You scored ${score} point(s)`;

    showFeedback(option);
}

function showFeedback(option) 
{
    const answer = database[currentQuestionNo].answer;

    let feedbackText = "";

    if(option === answer)
    {
        feedbackText = "That's correct!";
    } else if (option === null)
    {
        feedbackText = "Hey! Time's up! Next question";
    } else
    {
        feedbackText = "Wrong answer, better luck next time!";
    }

    FeedbackLable.textContent = feedbackText;

    // Hold for 3 seconds before it loads the next question
    setTimeout(() => {
        // define what we do 3 seconds later
        currentQuestionNo = currentQuestionNo + 1;
        loadNextQuestion();
        FeedbackLable.textContent = "";
    }, 3000);
}


function disableOptionButtons()
{
    const allOptionButton = document.querySelectorAll('.option-btn');
    // Disable all option button with a for-each loop
    allOptionButton.forEach(button => {
        button.disabled = true;
    });
}

function enableOptionButtons()
{
    const allOptionButton = document.querySelectorAll('.option-btn');
    // Enable all option button with a for-each loop
    allOptionButton.forEach(button => {
        button.disabled = false;
    });
}

function EndQuiz()
{
    clearInterval(timer);
    progressBarContainer.style.display = 'none';
    optionContainer.style.display = 'none';
    timerElement.style.display = 'none';
    FeedbackLable.textContent = "";
    questionElement.textContent = "Quiz had ended!!!! HOORAY!!! LET'S DO ROBLOX!";
}