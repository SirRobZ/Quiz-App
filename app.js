function main() {
	var state = {
		questions: [
			{
				question: 'What is the longest river in the world?',
				answers: ['Amazon','Nile','Yangtze','Mississippi'],
				answer: 'Amazon'
			},
			{
				question: 'What is the highest peak in North America?',
				answers: ['Mount Logan','Pico de Orizaba','Mount Saint Elias', 'Mount McKinley'],
				answer: 'Mount McKinley'
			},
			{
				question: 'Which of these countries is the largest in terms of land area?',
				answers: ['Australia','Brazil','India','Kazakhstan'],
				answer: 'Brazil'
			},
			{
				question: 'Which of these countries has the largest population?',
				answers: ['Russia','Japan','Mexico', 'Bangladesh'],
				answer: 'Bangladesh'
			},
			{
				question: 'What is the largest lake in the world?',
				answers: ['Lake Superior','Lake Victoria','Caspian Sea','Lake Michigan'],
				answer: 'Caspian Sea'
			}
		],
		currentQuestion: 0,
		currentScore: 0
	};

	function renderQuestion(state){
		//based on Current question index retrieve question from questions array
		var index = state.currentQuestion;
		var question = state.questions[index];
		var answerListHTML = question.answers.map(function(answer, index){
			return('<li>'+
						'<input type="radio" name="answer" value="' + answer + '" id="answer ' + index + '">'+
						'<label for="answer ' + index + '">' + answer + '</label>'+
					'</li>')
		})
		$('.container .question').text(question.question);
		$('.container .questionNumber').text('question ' + (state.currentQuestion + 1) + ' of 5');
		$('.container ul').html(answerListHTML);
	}

	function bindStartButtonEvent() {
		$('.start button').on('click', function(event){
			$('.start').toggleClass('hidden');
			$('.container').toggleClass('hidden');
		})
	}

	function bindCheckButtonEvent() {
		var userChoice = '';
		$('.container .checkButton').on('click', function(event){
			var answerChoice = document.getElementsByName('answer');
			for(i=0;i<answerChoice.length;i++){
				if(answerChoice[i].checked){
					userChoice = answerChoice[i].value;
				}
			}
			if(userChoice === state.questions[state.currentQuestion].answer){
				$('.container .result').removeClass('hidden');
				$('.container .result').text('Correct');
				state.currentQuestion++;
				state.currentScore++;
				$('.nextButton').toggleClass('hidden');
				$('.checkButton').toggleClass('hidden');
			} else {
				$('.container .result').removeClass('hidden');
				$('.container .result').text('Wrong! The correct answer is ' + state.questions[state.currentQuestion].answer);
				state.currentQuestion++;
				$('.nextButton').toggleClass('hidden');
				$('.checkButton').toggleClass('hidden');
			}
			$('input[type="radio"]').attr('disabled', true);
		})
	}

	function bindNextButtonEvent(){
		$('.container .nextButton').on('click', function(event){
			if (state.currentQuestion < state.questions.length){
				renderQuestion(state);
				$('.nextButton').toggleClass('hidden');
				$('.checkButton').toggleClass('hidden');
				$('.container .result').toggleClass('hidden');
			} else {
				$('.container').toggleClass('hidden');
				$('.finish').toggleClass('hidden');
				$('.finish p').text('Your final score was ' + state.currentScore + ' out of ' + state.questions.length);
			}
		})
	}

	function bindRetakeButtonEvent(){
		$('.finish .retakeButton').on('click', function(event){
			state.currentQuestion = 0;
			state.currentScore = 0;
			renderQuestion(state);
			$('.container').toggleClass('hidden');
			$('.finish').toggleClass('hidden');
			$('.nextButton').toggleClass('hidden');
			$('.checkButton').toggleClass('hidden');
			$('.container .result').toggleClass('hidden');
		})
	}

	bindStartButtonEvent();
	bindCheckButtonEvent();
	bindNextButtonEvent();
	bindRetakeButtonEvent();
	renderQuestion(state);
}
$(document).ready(main);