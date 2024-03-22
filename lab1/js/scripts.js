document.addEventListener('DOMContentLoaded', function() {
    async function fetchTestData() {
        try {
            const response = await fetch('../json/test.json');
            const testData = await response.json();
            return testData;
        } catch (error) {
            console.error('Помилка отримання даних з файлу test.json:', error);
        }
    }

    const testContainer = document.getElementById('test-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');

    function displayQuestions(questions) {
        testContainer.innerHTML = '';

        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            questionDiv.innerHTML = `
                <p>${index + 1}. ${question.question}</p>
            `;

            question.answers.forEach(answer => {
                const answerInput = document.createElement('input');
                answerInput.setAttribute('type', 'radio');
                answerInput.setAttribute('name', `question-${index}`);
                answerInput.setAttribute('value', answer.isCorrect.toString());

                const answerLabel = document.createElement('label');
                answerLabel.textContent = answer.answer;

                const br = document.createElement('br');

                questionDiv.appendChild(answerInput);
                questionDiv.appendChild(answerLabel);
                questionDiv.appendChild(br);
            });

            testContainer.appendChild(questionDiv);
        });
    }

    function checkResults(questions) {
        let correctAnswers = 0;

        questions.forEach((question, index) => {
            const selectedAnswer = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedAnswer) {
                const answerResult = document.createElement('span');
                answerResult.classList.add('answer-result');
                if (selectedAnswer.value === 'true') {
                    answerResult.textContent = ' Правильно';
                    answerResult.style.color = 'green';
                    correctAnswers++;
                } else {
                    answerResult.textContent = ' Неправильно';
                    answerResult.style.color = 'red';
                }
                const br = document.createElement('br');
                const questionDiv = document.querySelectorAll('.question')[index];
                questionDiv.appendChild(br);
                questionDiv.appendChild(answerResult);
            }
        });

        const totalQuestions = questions.length;
        const resultPercentage = ((correctAnswers / totalQuestions) * 100).toFixed(2);
        resultContainer.textContent = `Ви відповіли правильно на ${correctAnswers} з ${totalQuestions} питань. Ваш результат: ${resultPercentage}%.`;
    }

    submitBtn.addEventListener('click', async function() {
        const testData = await fetchTestData();
        if (testData) {
            checkResults(testData.questions);
        }
    });

    fetchTestData().then(testData => {
        if (testData) {
            displayQuestions(testData.questions);
        }
    });
});