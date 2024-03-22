document.addEventListener("DOMContentLoaded", function() {

    var menuIcon = document.querySelector('.menu-icon');
    var mainMenu = document.querySelector('.main-menu');

    menuIcon.addEventListener('click', function() {
        if (mainMenu.style.display === 'none' || mainMenu.style.display === '') {
            mainMenu.style.display = 'block';
        } else {
            mainMenu.style.display = 'none';
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.survey-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const timestamp = new Date().getTime();

        const formData = new FormData(form);
        const formDataObject = {};
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });

        const uniqueKey = `survey_${timestamp}`;

        localStorage.setItem(uniqueKey, JSON.stringify(formDataObject));

        alert('Результати опитування збережено!');
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.survey-form');
    const filterContainer = document.createElement('div'); 
    const resultsContainer = document.createElement('div');

    document.body.appendChild(filterContainer);
    document.body.appendChild(resultsContainer);

    function displayFilteredResults(filteredData) {
        const resultsList = document.getElementById('survey-results');
        resultsList.innerHTML = '';

        if (filteredData.length === 0) {
            resultsList.innerHTML = '<p>Немає результатів, що відповідають вибраним фільтрам</p>';
        } else {
            filteredData.forEach(result => {
                const data = JSON.parse(result);
                const li = document.createElement('li');
                li.textContent = `Ім'я: ${data.name}, Вік: ${data.age}, Стать: ${data.gender}, Інтереси: ${data.interests}`;
                resultsList.appendChild(li);
            });
        }
    }

    
function filterByGender(gender) {
    const savedData = Object.values(localStorage); 
    const filteredData = savedData.filter(entry => {
        const data = JSON.parse(entry);
        return gender === 'all' ? true : data.gender === gender;
    });
    return filteredData.map(entry => JSON.parse(entry));
}

function filterByAge(minAge, maxAge) {
    const savedData = Object.values(localStorage); 
    const filteredData = savedData.filter(entry => {
        const data = JSON.parse(entry);
        const age = parseInt(data.age);
        return age >= minAge && age <= maxAge;
    });
    return filteredData.map(entry => JSON.parse(entry));
}

function filterByInterests(interest) {
    const savedData = Object.values(localStorage); 
    const filteredData = savedData.filter(entry => {
        const data = JSON.parse(entry);
        return interest === 'all' ? true : data.interests.includes(interest);
    });
    return filteredData.map(entry => JSON.parse(entry));
}

    const applyFiltersBtn = document.getElementById('apply-filters-btn');

    applyFiltersBtn.addEventListener('click', function() {
        const gender = document.getElementById('gender-filter').value;
        const minAge = parseInt(document.getElementById('min-age-filter').value);
        const maxAge = parseInt(document.getElementById('max-age-filter').value);
        const interests = document.getElementById('interests-filter').value;

        const savedData = Object.values(localStorage);

        const filteredData = savedData.filter(entry => {
            const data = JSON.parse(entry);
            const age = parseInt(data.age);
            return (
                (gender === 'all' || data.gender === gender) &&
                (isNaN(minAge) || age >= minAge) &&
                (isNaN(maxAge) || age <= maxAge) &&
                (interests === 'all' || data.interests.includes(interests))
            );
        });
        displayFilteredResults(filteredData);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const colorInput = document.getElementById('favorite-color');
    const colorDisplay = document.createElement('div');
    colorDisplay.style.width = '50px';
    colorDisplay.style.height = '20px';
    colorDisplay.style.border = '1px solid #ccc';
    colorDisplay.style.display = 'inline-block';
    colorDisplay.style.marginLeft = '10px';

    colorInput.addEventListener('input', function() {
        colorDisplay.style.backgroundColor = colorInput.value;
    });

    colorInput.parentNode.insertBefore(colorDisplay, colorInput.nextSibling);
});



