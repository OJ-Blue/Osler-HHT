document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Samle inn intensitetsverdier fra spørsmål 1-4
    const intensity1 = parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const intensity2 = parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const intensity3 = parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const intensity4 = parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);

    // Blodtransfusjon (spørsmål 5)
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Velg de to høyeste intensitetsverdiene
    const intensities = [intensity1, intensity2, intensity3, intensity4];
    const twoHighestIntensities = intensities.sort((a, b) => b - a).slice(0, 2);

    // Beregn total poengsum
    const totalScore = twoHighestIntensities.reduce((acc, val) => acc + val, 0) + transfusion;

    // Bestem klassifisering basert på total poengsum
    let classification = '';
    let colorClass = '';
    if (totalScore === 0) {
        classification = lang === 'en' ? 'No bleeding' : 'Ingen blødning';
        colorClass = 'mild';
    } else if (totalScore >= 1 && totalScore <= 5) {
        classification = lang === 'en' ? 'Mild bleeding' : 'Mild blødning';
        colorClass = 'mild';
    } else if (totalScore >= 6 && totalScore <= 10) {
        classification = lang === 'en' ? 'Moderate bleeding' : 'Moderat blødning';
        colorClass = 'moderate';
    } else if (totalScore >= 11 && totalScore <= 15) {
        classification = lang === 'en' ? 'Severe bleeding' : 'Alvorlig blødning';
        colorClass = 'severe';
    } else if (totalScore >= 16) {
        classification = lang === 'en' ? 'Intractable bleeding' : 'Ukontrollerbar blødning';
        colorClass = 'intractable';
    }

    // Vis resultat og skala
    document.getElementById('result').innerHTML = `<div class="result-text ${colorClass}">${classification}</div><div>${lang === 'en' ? 'Your score' : 'Din poengsum'}: ${totalScore}/30</div>`;
    document.getElementById('scale-container').style.display = 'block';

    // Oppdater skalaindikatoren
    const scoreMarker = document.getElementById('score-marker');
    const percentage = (totalScore / 30) * 100;
    scoreMarker.style.left = `calc(${percentage}% - 10px)`;
});

// Språkveksling-funksjonalitet
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en';  // Standard språk

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en';  // Bytt språk basert på knapp
        updateLanguage(lang);

        // Fremhev aktiv knapp
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

function updateLanguage(language) {
    document.documentElement.lang = language;
    document.getElementById('page-title').textContent = language === 'en' ? 'Epistaxis Grading (IFT)' : 'Epistaxis Gradering (IFT)';

    const description = document.getElementById('description');
    description.textContent = description.getAttribute(`data-${language}`);

    // Oppdater knappetekst
    const submitButton = document.getElementById('submitBtn');
    submitButton.textContent = submitButton.getAttribute(`data-${language}`);

    // Oppdater spørsmål og alternativer
    const elementsToUpdate = document.querySelectorAll('[data-en]');
    elementsToUpdate.forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });
}
