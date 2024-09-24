// JavaScript for language toggle and calculating grading
document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect intensity selections
    const intensity1 = parseInt(document.getElementById('intensity1').value);
    const intensity2 = parseInt(document.getElementById('intensity2').value);
    const intensity3 = parseInt(document.getElementById('intensity3').value);
    const intensity4 = parseInt(document.getElementById('intensity4').value);
    const transfusion = parseInt(document.getElementById('transfusion').value);

    // Count how many intensities were selected (non-zero)
    const selectedIntensities = [intensity1, intensity2, intensity3, intensity4].filter(value => value !== 0);

    if (selectedIntensities.length > 2) {
        alert("You can only select two intensities.");
        return;
    }

    // If the user selected two or fewer intensities, calculate the score based on two largest values
    const maxIntensities = selectedIntensities.sort((a, b) => b - a); // Sort intensities to get the top 2
    const firstIntensity = maxIntensities[0] || 0; // First most intense (default to 0 if none)
    const secondIntensity = maxIntensities[1] || 0; // Second most intense (default to 0 if none)

    // Calculate the total score using the two largest intensities
    const score = (firstIntensity * 3) + (secondIntensity * 4) + transfusion;

    // Determine the bleeding classification based on the score
    let classification = '';
    if (score === 0) {
        classification = 'no bleeding';
    } else if (score >= 1 && score <= 5) {
        classification = lang === 'en' ? 'mild bleeding' : 'mild blødning';
    } else if (score >= 6 && score <= 10) {
        classification = lang === 'en' ? 'moderate bleeding' : 'moderat blødning';
    } else if (score >= 11 && score <= 15) {
        classification = lang === 'en' ? 'severe bleeding' : 'alvorlig blødning';
    } else if (score >= 16 && score <= 30) {
        classification = lang === 'en' ? 'intractable bleeding' : 'ukontrollerbar blødning';
    }

    // Display the result in the selected language
    document.getElementById('result').textContent = lang === 'en'
        ? `Your total grading is: ${score} (${classification})`
        : `Din totale poengsum er: ${score} (${classification})`;
});

// Add Event Listeners for Language Switcher
let lang = 'en'; // default language is English
document.getElementById('english').addEventListener('click', function() {
    switchLanguage('en');
});
document.getElementById('norwegian').addEventListener('click', function() {
    switchLanguage('no');
});

function switchLanguage(selectedLang) {
    lang = selectedLang; // update the global language variable

    // Change text for each element
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(function (element) {
        element.textContent = element.getAttribute(`data-${lang}`);
    });

    // Change the subheading
    const subheading = document.getElementById('subheading');
    subheading.textContent = subheading.getAttribute(`data-${lang}`);

    // Change the text for dropdown options
    const options = document.querySelectorAll('select option');
    options.forEach(function (option) {
        option.textContent = option.getAttribute(`data-${lang}`);
    });

    // Update the page title based on selected language
    document.getElementById('page-title').textContent = lang === 'en' ? "Epistaxis Grading (IFT)" : "Gradering av epistaxis (IFT)";

    // Toggle button active state
    document.getElementById('english').classList.toggle('active', lang === 'en');
    document.getElementById('norwegian').classList.toggle('active', lang === 'no');
}
