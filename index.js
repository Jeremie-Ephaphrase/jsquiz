var allQuestions = [{
  question: "What is the capital city of South Africa?",
  choices: ["Pretoria", "Durban", "New york", "Limpopo"],
  correctAnswer: 0
}, 
{
  question: "what is the capital city of USA?",
  choices: ["Poland", "Lagos", "Chicago", "Washington DC"],
  correctAnswer: 3
}, 
{
  question: "Who is the founder of Facebook?",
  choices: ["Harry Poter", "Mark Zukenburg", "Gay Lord", "Bill Gates"],
  correctAnswer: 1
},
{
  question: "What is the capital city of England?",
  choices: ["Manchester", "Brusells", "Paris", "London"],
  correctAnswer: 3
}, 
{
  question: "Where was Mandela Born?",
  choices: ["Kampsbay", "Mannenburg", "Qunu", "Kwazulu-Natal"],
  correctAnswer: 2
}, 
{
  question: "1+1 =",
  choices: ["4", "2", "5", "6"],
  correctAnswer: 1
}, 
{
  question: "Who is Brad Pit?",
  choices: ["Actress", "Man of Action", "Photagrapher", "Actor"],
  correctAnswer: 3
}, 
{
  question: "Who is Ronaldo?",
  choices: ["Soccer Player", "Referee", "Netball Player", "Coach"],
  correctAnswer: 0
},
 {
  question: "What is the capital city of France?",
  choices: ["Chicago", "Beijing", "Paris", "Lyon"],
  correctAnswer: 2
},
 {
  question: "Who is the founder of Microsoft?",
  choices: ["Donald Trump", "Quincy Larson", "Bill Gates", "Tom Hanks"],
  correctAnswer: 2
}, 
{
  question: "Who is the founder of Apple?",
  choices: ["Harry Potter", "Steve Jobs", "Will Smith", "Obama"],
  correctAnswer: 1
}, {
  question: "What colour is a banana?",
  choices: ["Green", "Blue", "Orange", "Yellow"],
  correctAnswer: 3
}, {
  question: "What is a Lemon?",
  choices: ["Fruit", "Poison", "Phone", "Acid"],
  correctAnswer: 0
}, {
  question: "Which of the following is a city in South Africa?",
  choices: ["Cape Town", "Paarl", "Moscow", "Berlin"],
  correctAnswer: 0
}, {
  question: "Where is Berlin ?",
  choices: ["Greece", "England", "Canada", "Germany"],
  correctAnswer: 3
}, {
  question: "Who is Will Smith?",
  choices: ["Fashion Designer", "Actor", "Therapist", "Speaker"],
  correctAnswer: 1
}, {
  question: "What colour is a strawberry?",
  choices: ["Grey", "orange", "red", "blue"],
  correctAnswer: 2
}, {
  question: "Who is Donald Trump?",
  choices: ["Chancellor", "President ", "Dealer", "Boss"],
  correctAnswer: 1
}, {
  question: "Where is Toronto?",
  choices: ["USA", "Canada", "Green land", "Brazil"],
  correctAnswer: 1
}, {
  question: "Where is Rome?",
  choices: ["England", "Wales", "Ireland", "Italy"],
  correctAnswer: 3
}, {
  question: "What continent is Poland located in??",
  choices: ["Africa", "Europe", "North America", "Asia"],
  correctAnswer: 1
}];

function Quiz(options) {
  var elem = options.elem;
  var allQuestions = options.questions;
  var q_number = allQuestions.length;

  var answers = [];
  var questions = [];

  var correct_answers = 0;
  var current_number;

  generateQuestions(allQuestions);
  
  initQuiz();

  function generateQuestions(q) {
    for (var i = 0; i < q_number; i++) {
      var question = document.createElement('div');
      question.classList.add('question');
      question.id = 'question';

      var title = document.createElement('h1');
      title.textContent = q[i].question;

      question.appendChild(title);

      var list = document.createElement('ul');

      for (var j = 0, len = q[i].choices.length; j < len; j++) {
        var choice = document.createElement('li');

        var check = document.createElement('input');
        check.setAttribute('type', 'radio');
        check.setAttribute('name', 'question');

        var choice_text = document.createElement('label');
        choice_text.setAttribute('for', check.name);
        choice_text.textContent = q[i].choices[j];

        choice.appendChild(check);
        choice.appendChild(choice_text);

        list.appendChild(choice);
      }

      var prev_button = document.createElement('button');
      prev_button.textContent = 'Previous Question';
      prev_button.addEventListener('click', prevQuestion);

      var next_button = document.createElement('button');

      if (i === q_number - 1) {
        next_button.textContent = 'Finish Him';
        next_button.addEventListener('click', finishQuiz);
      } else {
        next_button.textContent = 'Next Question';
        next_button.addEventListener('click', nextQuestion);
      }

      question.appendChild(list);

      if (i > 0) question.appendChild(prev_button);
      question.appendChild(next_button);

      questions.push(question);
    }
  }

  function render_question(number) {
    var warning = elem.getElementsByClassName('warning')[0];
    if (warning) {
      elem.removeChild(warning);
    }
    elem.appendChild(questions[number]);
    $('#question').hide().fadeIn(500);
  }

  function initQuiz() {
    current_number = 0;
    render_question(current_number);
  }

  function checkAnswers() {
    for (var i = 0; i < q_number; i++) {
      if (answers[i] === allQuestions[i].correctAnswer) {
        correct_answers++;
      }
    }
  }

  function validateAnswer() {
    var list_items = elem.getElementsByTagName('input');
    var answered = false;
    for (var i = 0, len = list_items.length; i < len; i++) {
      if (list_items[i].checked) {
        answers.push(i);
        answered = true;
        break;
      }
    }
    if (!answered && !elem.getElementsByClassName('warning')[0]) {
      var warning = document.createElement('span');
      warning.textContent = "Answer the question before you proceed, please.";
      warning.classList.add('warning');

      elem.appendChild(warning);
    }
    return answered;
  }

  function nextQuestion() {
    if (validateAnswer()) {
      elem.removeChild(questions[current_number]);
      current_number++;
      render_question(current_number);
    }
  }

  function prevQuestion() {
    elem.removeChild(questions[current_number]);
    answers.pop();
    current_number--;
    render_question(current_number);
  }

  function finishQuiz() {
    if (validateAnswer()) {
      checkAnswers();
      elem.removeChild(questions[current_number]);
      var result = document.createElement('p');
      if (correct_answers === 0) {
        result.textContent = "Thank you for taking this quiz! Sorry, but none of your answers were right :( Try again if you want to improve your score.";
      } else {
        result.textContent = "Thank you! Your final score is: " + correct_answers + " / 20 ";
      }
      elem.appendChild(result);
    }
  }
}

var quiz = new Quiz({
  elem: document.getElementById('quiz'),
  questions: allQuestions
});