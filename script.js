document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Collect values from each intensity question (multiply intensity by frequency)
    const intensity1 = 1 * parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const intensity2 = 2 * parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const intensity3 = 3 * parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const intensity4 = 4 * parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);
    
    // Collect the transfusion score (question 5)
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Put all intensity scores into an array
    const intensityScores = [intensity1, intensity2, intensity3, intensity4];

    // Sort the intensities by severity and select the two most severe (highest values)
    const twoMostSevere = intensityScores.sort((a, b) => b - a).slice(0, 2);

    // Calculate the total score by summing the two most severe intensities and the transfusion score
    const totalScore = twoMostSevere.reduce((acc, val) => acc + val, 0) + transfusion;

    // Determine the bleeding classification based on the total score
    let classification = '';
    let colorClass = '';  // Add a variable to store the color class
    if (totalScore === 0) {
        classification = lang === 'en' ? 'No bleeding' : 'Ingen blødning';
        colorClass = 'mild';  // Green for no bleeding
    } else if (totalScore >= 1 && totalScore <= 5) {
        classification = lang === 'en' ? 'Mild bleeding' : 'Mild blødning';
        colorClass = 'mild';  // Green for mild
    } else if (totalScore >= 6 && totalScore <= 10) {
        classification = lang === 'en' ? 'Moderate bleeding' : 'Moderat blødning';
        colorClass = 'moderate';  // Yellow/Orange for moderate
    } else if (totalScore >= 11 && totalScore <= 15) {
        classification = lang === 'en' ? 'Severe bleeding' : 'Alvorlig blødning';
        colorClass = 'severe';  // Red for severe
    } else if (totalScore >= 16) {
        classification = lang === 'en' ? 'Intractable bleeding' : 'Ukontrollerbar blødning';
        colorClass = 'intractable';  // Dark red for intractable
    }

    // Display the result with the appropriate color class
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<div class="result-text ${colorClass}">${classification}</div><div>${lang === 'en' ? 'Your score' : 'Din poengsum'}: ${totalScore}/30</div>`;

    // Show the scale
    document.getElementById('scale-container').style.display = 'block';

    // Update the score marker on the scale
    const scoreMarker = document.getElementById('score-marker');
    const percentage = (totalScore / 30) * 100;
    scoreMarker.style.left = `calc(${percentage}% - 10px)`;  // Adjust for arrow width
});

// Language toggle functionality
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en';  // Default language

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en';  // Switch language based on button clicked
        updateLanguage(lang);

        // Toggle active class on buttons
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

function updateLanguage(language) {
    document.documentElement.lang = language;
    document.getElementById('page-title').textContent = language === 'en' ? 'Epistaxis Grading (IFT)' : 'Epistaxis Gradering (IFT)';

    const description = document.getElementById('description');
    description.textContent = description.getAttribute(`data-${language}`);

    // Update button text
    const submitButton = document.getElementById('submitBtn');
    submitButton.textContent = submitButton.getAttribute(`data-${language}`);

    // Update labels and spans
    const elementsToUpdate = document.querySelectorAll('[data-en]');
    elementsToUpdate.forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });
}
