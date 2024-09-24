// script.js

// Add Event Listeners for Language Switcher
document.getElementById('english').addEventListener('click', function() {
    switchLanguage('en');
});
document.getElementById('norwegian').addEventListener('click', function() {
    switchLanguage('no');
});

function switchLanguage(lang) {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach((element) => {
        element.textContent = element.getAttribute(`data-${lang}`);
    });
    
    document.getElementById('english').classList.toggle('active', lang === 'en');
    document.getElementById('norwegian').classList.toggle('active', lang === 'no');
}

// Calculate Score Logic
document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form
    const intensity1 = parseInt(document.getElementById('intensity1').value);
    const intensity2 = parseInt(document.getElementById('intensity2').value);
    const intensity3 = parseInt(document.getElementById('intensity3').value);
    const intensity4 = parseInt(document.getElementById('intensity4').value);
    const transfusion = parseInt(document.getElementById('transfusion').value);

    // Calculate the total score
    const score = intensity1 + intensity2 + intensity3 + intensity4 + transfusion;

    // Display the result
    document.getElementById('result').textContent = `Your total score is: ${score}`;
});
