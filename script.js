document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect intensity and frequency values from questions 1-4
    const intensity1 = 1 * parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const intensity2 = 2 * parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const intensity3 = 3 * parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const intensity4 = 4 * parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);

    // Collect transfusion points from question 5 (0-2 points)
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Create an array of intensity scores, where intensityX * frequency is the score
    const intensityScores = [
        { score: intensity1, intensity: 1 },
        { score: intensity2, intensity: 2 },
        { score: intensity3, intensity: 3 },
        { score: intensity4, intensity: 4 }
    ];

    // Filter out intensities with score 0 (None) to keep only answered intensities
    const filteredIntensities = intensityScores.filter(item => item.score > 0);

    // Sort the remaining intensities by severity (intensity value, not score)
    const sortedIntensities = filteredIntensities.sort((a, b) => b.intensity - a.intensity);

    // Use only the two most severe intensities for calculation
    const topTwoIntensities = sortedIntensities.slice(0, 2);

    // Calculate the total score using the two highest intensity scores and adding the transfusion score
    const totalScore = topTwoIntensities.reduce((acc, item) => acc + item.score, 0) + transfusion;

    // Determine the bleeding classification based on the total score
    let classification = '';
    let colorClass = '';  // Add a variable to store the color class for styling the result text

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

    // Show the scale container (which was hidden initially)
    document.getElementById('scale-container').style.display = 'block';

    // Update the score marker on the scale to reflect the position based on the score
    const scoreMarker = document.getElementById('score-marker');
    const percentage = (totalScore / 30) * 100;
    scoreMarker.style.left = `calc(${percentage}% - 10px)`;  // Adjust the marker to reflect the score on the scale
});

// Language switching functionality
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en';  // Default language

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en';  // Switch language based on button clicked
        updateLanguage(lang);

        // Highlight selected button with darker blue
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

    // Update questions and answers
    const elementsToUpdate = document.querySelectorAll('[data-en]');
    elementsToUpdate.forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });
}
