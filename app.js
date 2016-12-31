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
				answers: ['Mount McKinley','Mount Logan','Pico de Orizaba','Mount Saint Elias'],
				answer: 'Mount McKinley'
			}
		],
		currentQuestion: 0
	};

	function renderQuestion(state){
		//based on Current question index retrieve question from questions array
		var index = state.currentQuestion;
		var question = state.questions[index]
		var answerListHTML = question.answers.map(function(answer, index){
			return('<li>'+
						'<input type="radio" name="answer" value="' + answer + '" id="answer ' + index + '">'+
						'<label for="answer ' + index + '">' + answer + '</label>'+
					'</li>')
		})
		$('.container .question').text(question.question);
		$('.container ul').html(answerListHTML);
	}

	function bindStartButtonEvent() {
		$('.start button').on('click', function(event){
			$('.start').toggleClass('hidden');
			$('.container').toggleClass('hidden');
		})
	}

	bindStartButtonEvent();
	renderQuestion(state);
}
$(document).ready(main);