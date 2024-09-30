document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    // Collect intensity selections
    const intensities = [
        parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0)
    ];
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Sort intensities and use the two highest values
    const sortedIntensities = intensities.sort((a, b) => b - a);
    const firstIntensity = sortedIntensities[0] || 0;
    const secondIntensity = sortedIntensities[1] || 0;

    // Calculate score
    const score = (firstIntensity * 3) + (secondIntensity * 4) + transfusion;

    // Determine the bleeding classification based on the score
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
    } else if (score >= 16) {
        classification = lang === 'en' ? 'Intractable bleeding' : 'Ukontrollerbar blødning';
        resultClass = 'severe';
    }

    // Display the result
    const resultElement = document.getElementById('result');
    resultElement.textContent = classification;
    resultElement.className = `result ${resultClass}`;
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
    document.getElementById('page-title').textContent = language === 'en' ? 'Epistaxis Grading (IFT)' : 'Epistaxis Gradering (IFT)';
    document.getElementById('subheading').textContent = document.getElementById('subheading').getAttribute(`data-${language}`);

    const labels = document.querySelectorAll('label');
    labels.forEach(label => {
        label.textContent = label.getAttribute(`data-${language}`);
    });

    const spans = document.querySelectorAll('span');
    spans.forEach(span => {
        span.textContent = span.getAttribute(`data-${language}`);
    });
}
