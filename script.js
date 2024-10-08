document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect values from each intensity question (multiply intensity by frequency)
    const intensity1 = parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const intensity2 = parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const intensity3 = parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const intensity4 = parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Sort intensities and take the two most severe
    const intensities = [intensity1, intensity2, intensity3, intensity4];
    const topTwoIntensities = intensities.sort((a, b) => b - a).slice(0, 2);
    const score = topTwoIntensities.reduce((acc, curr) => acc + curr, 0) + transfusion;

    // Determine the classification based on the score
    let classification = '';
    let resultClass = '';

    if (score === 0) {
        classification = lang === 'en' ? 'No bleeding' : 'Ingen blødning';
        resultClass = 'mild';
    } else if (score >= 1 && score <= 5) {
        classification = lang === 'en' ? 'Mild bleeding' : 'Mild blødning';
        resultClass = 'mild';
    } else if (score >= 6 && score <= 10) {
        classification = lang === 'en' ? 'Moderate bleeding' : 'Moderat blødning';
        resultClass = 'moderate';
    } else if (score >= 11 && score <= 15) {
        classification = lang === 'en' ? 'Severe bleeding' : 'Alvorlig blødning';
        resultClass = 'severe';
    } else {
        classification = lang === 'en' ? 'Intractable bleeding' : 'Ukontrollerbar blødning';
        resultClass = 'intractable';
    }

    // Display the result with color coding
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<div class="result-text ${resultClass}">${classification}</div><div>${lang === 'en' ? 'Your score' : 'Din poengsum'}: ${score}/30</div>`;
    resultElement.style.display = 'block';

    // Show the scale
    const scaleContainer = document.getElementById('scale-container');
    scaleContainer.style.display = 'block';

    // Update the score marker on the scale
    const scoreMarker = document.getElementById('score-marker');
    const percentage = (score / 30) * 100;
    scoreMarker.style.left = `calc(${percentage}% - 10px)`;
});

// Language toggle functionality
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en'; // Default language

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en'; // Switch language based on button clicked
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

    const submitButton = document.getElementById('submitBtn');
    submitButton.textContent = submitButton.getAttribute(`data-${language}`);

    const elementsToUpdate = document.querySelectorAll('[data-en]');
    elementsToUpdate.forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });
}
