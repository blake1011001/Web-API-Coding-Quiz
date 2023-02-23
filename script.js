var questions = [
    {
        question: "A useful tool for debugging and web development that helps print content to the console is called what?",
        options: {
            A: "boolean", 
            B: "array", 
            C: "console.log", 
            D: "curly brackets",
        }, 
        correctAnswer: "console.log"    
    },
    {
        question: "Boolean operators that can be used in JavaScript include which?",
        options: {
            A: "'not' operator !",
            B: "'and' operator &&",
            C: "'or' operator ||",
            D: "all of the above",
        },
        correctAnswer: "all of the above"
    },
    {
        question: "Commonly used data types do not include which?",
        options: {
            A: "booleans",
            B: "alerts",
            C: "numbers",
            D: "strings"
        },
        correctAnswer: "alerts"
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        options: {
            A: "quotes",
            B: "parentheses",
            C: "commas",
            D: "curly brackets",
        },
        correctAnswer: "quotes"
    },
    {
        question: "Arrays in JavaScript can be used to store which?",
        options: {
            A: "numbers and strings",
            B: "other arrays",
            C: "booleans",
            D: "all of the above",
        },
        correctAnswer: "all of the above"
    },
];

      var containerQuestionEl = document.getElementById("question-container");
      var containerStartEl = document.getElementById("starter-container");
      var containerEndEl = document.getElementById("end-container")
      var containerScoreEl = document.getElementById("score-banner")
      var formInitials = document.getElementById("initials-form")
      var containerHighScoresEl = document.getElementById("high-score-container")
      var ViewHighScoreEl = document.getElementById("view-high-scores")
      var listHighScoreEl = document.getElementById("high-score-list")
      var correctEl = document.getElementById("correct")
      var wrongEl = document.getElementById("wrong")
    
      var btnStartEl = document.querySelector("#start-game");
      var btnGoBackEl = document.querySelector("#go-back")
      var btnClearScoresEl = document.querySelector("#clear-high-scores")
    
      var questionEl = document.getElementById("question")
      var answerbuttonsEl = document.getElementById("answer-buttons")
      var timerEl = document.querySelector("#timer");
      var score = 0;
      var timeleft;
      var gameover
      timerEl.innerText = 0;

      var HighScores = [];
 
      var arrayShuffledQuestions
      var QuestionIndex = 0

      var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        containerStartEl.classList.remove("hide")
        containerStartEl.classList.add("show")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (wrongEl.className = "show") {
            wrongEl.classList.remove("show");
            wrongEl.classList.add("hide");
        }
    }

    var setTime = function () {
        timeleft = 30;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft <= 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        containerStartEl.classList.add('hide');
        containerStartEl.classList.remove('show');
        containerQuestionEl.classList.remove('hide');
        containerQuestionEl.classList.add('show');
        arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5)
        setTime()
        setQuestion()
      }

    var setQuestion = function() {
        resetAnswers()
        displayQuestion(arrayShuffledQuestions[QuestionIndex])
    }
    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };
    
        var answerCorrect = function() {
            if (correctEl.className = "hide") {
                correctEl.classList.remove("hide")
                correctEl.classList.add("banner")
                wrongEl.classList.remove("banner")
                wrongEl.classList.add("hide")
                }
            }  
    
        var answerWrong = function() {
            if (wrongEl.className = "hide") {
                wrongEl.classList.remove("hide")
                wrongEl.classList.add("banner")
                correctEl.classList.remove("banner")
                correctEl.classList.add("hide")
            }
        }
       
        var answerCheck = function(event) {
            var selectedanswer = event.target
                if (arrayShuffledQuestions[QuestionIndex].a === selectedanswer.innerText){
                    answerCorrect()
                    score = score + 10
                }
    
                else {
                  answerWrong()
                  score = score - 1;
                  timeleft = timeleft - 5;
              };
    
              QuestionIndex++
                if  (arrayShuffledQuestions.length > QuestionIndex + 1) {
                    setQuestion()
                }   
                else {
                   gameover = "true";
                   showScore();
                    }
        }
    
        var showScore = function () {
            containerQuestionEl.classList.add("hide");
            containerEndEl.classList.remove("hide");
            containerEndEl.classList.add("show");
    
            var scoreDisplay = document.createElement("p");
            scoreDisplay.innerText = ("Your score " + score + "!");
            containerScoreEl.appendChild(scoreDisplay);
        }       
    
        var createHighScore = function(event) { 
            event.preventDefault() 
            var initials = document.querySelector("#initials").value;
            if (!initials) {
              alert("Enter your intials!");
              return;
            }
    
          formInitials.reset();
    
          var HighScore = {
          initials: initials,
          score: score
          } 
    
          HighScores.push(HighScore);
          HighScores.sort((a, b) => {return b.score-a.score});
    
        while (listHighScoreEl.firstChild) {
           listHighScoreEl.removeChild(listHighScoreEl.firstChild)
        }
      
        for (var i = 0; i < HighScores.length; i++) {
          var highscoreEl = document.createElement("li");
          highscoreEl.ClassName = "high-score";
          highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
          listHighScoreEl.appendChild(highscoreEl);
        }
    
          saveHighScore();
          displayHighScores();
    
        }
    
        var saveHighScore = function () {
            localStorage.setItem("HighScores", JSON.stringify(HighScores))
                
        }
    
        var loadHighScore = function () {
            var LoadedHighScores = localStorage.getItem("HighScores")
                if (!LoadedHighScores) {
                return false;
            }
    
            LoadedHighScores = JSON.parse(LoadedHighScores);
            LoadedHighScores.sort((a, b) => {return b.score-a.score})
     
    
            for (var i = 0; i < LoadedHighScores.length; i++) {
                var highscoreEl = document.createElement("li");
                highscoreEl.ClassName = "high-score";
                highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
                listHighScoreEl.appendChild(highscoreEl);
    
                HighScores.push(LoadedHighScores[i]);
                
            }
        }  
    
        var displayHighScores = function() {
    
            containerHighScoresEl.classList.remove("hide");
            containerHighScoresEl.classList.add("show");
            gameover = "true"
    
            if (containerEndEl.className = "show") {
                containerEndEl.classList.remove("show");
                containerEndEl.classList.add("hide");
                }
            if (containerStartEl.className = "show") {
                containerStartEl.classList.remove("show");
                containerStartEl.classList.add("hide");
                }
                
            if (containerQuestionEl.className = "show") {
                containerQuestionEl.classList.remove("show");
                containerQuestionEl.classList.add("hide");
                }
    
            if (correctEl.className = "show") {
                correctEl.classList.remove("show");
                correctEl.classList.add("hide");
            }
    
            if (wrongEl.className = "show") {
                wrongEl.classList.remove("show");
                wrongEl.classList.add("hide");
                }
            
        }
        var clearScores = function () {
            HighScores = [];
    
            while (listHighScoreEl.firstChild) {
                listHighScoreEl.removeChild(listHighScoreEl.firstChild);
            }
    
            localStorage.clear(HighScores);
    
        } 
    
        loadHighScore()
          btnStartEl.addEventListener("click", startGame)
          btnClearScoresEl.addEventListener("click", clearScores)
          ViewHighScoreEl.addEventListener("click", displayHighScores)
          formInitials.addEventListener("submit", createHighScore)
          btnGoBackEl.addEventListener("click", renderStartPage)