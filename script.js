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
    
    // Update dropdown options to match the selected language
    const selects = document.querySelectorAll('select option');
    selects.forEach((option) => {
        option.textContent = option.getAttribute(`data-${lang}`);
    });

    // Update the page title
    document.getElementById('page-title').textContent = lang === 'en' ? "Epistaxis Grading (IFT)" : "Gradering av epistaxis (IFT)";

    // Toggle active button styling
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

    // Correct IFT calculation based on the provided method:
    // Multiply intensity (I) by frequency (F) and sum the results, then add transfusion (T)
    const score = (intensity1 * 1) + (intensity2 * 2) + (intensity3 * 3) + (intensity4 * 4) + transfusion;

    // Determine the bleeding classification based on the score
    let classification = '';
    if (score === 0) {
        classification = 'no bleeding';
    } else if (score >= 1 && score <= 5) {
        classification = 'mild bleeding';
    } else if (score >= 6 && score <= 10) {
        classification = 'moderate bleeding';
    } else if (score >= 11 && score <= 15) {
        classification = 'severe bleeding';
    } else if (score >= 16 && score <= 30) {
        classification = 'intractable bleeding';
    }

    // Display the result with "grading" added to the score
    document.getElementById('result').textContent = `Your total grading is: ${score} (${classification})`;
});
