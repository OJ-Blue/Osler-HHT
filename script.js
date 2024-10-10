document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Forhindre standard innsending av skjemaet

    // Hente intensiteter fra spørsmål 1-4
    const intensity1 = parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const intensity2 = parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const intensity3 = parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const intensity4 = parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);

    // Hente frekvenspoeng fra spørsmål 1-4 (frekvensene er verdiene fra radio-knappene)
    const frequency1 = parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const frequency2 = parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const frequency3 = parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const frequency4 = parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);

    // Hente poeng for blodtransfusjon fra spørsmål 5
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Beregn totalpoeng for hver intensitet ved å gange intensitet med frekvens
    const score1 = intensity1 * frequency1;
    const score2 = intensity2 * frequency2;
    const score3 = intensity3 * frequency3;
    const score4 = intensity4 * frequency4;

    // Lag en array av intensitetspoengene og deres tilhørende intensiteter (1-4)
    const intensityScores = [
        { score: score1, intensity: 1 },
        { score: score2, intensity: 2 },
        { score: score3, intensity: 3 },
        { score: score4, intensity: 4 }
    ];

    // Sorter arrayen etter intensitet (ikke poengsum) for å finne de to høyeste intensitetene
    const sortedIntensities = intensityScores.sort((a, b) => b.intensity - a.intensity);

    // Velg de to høyeste intensitetene som har en score større enn 0
    const topTwoIntensities = sortedIntensities.filter(item => item.score > 0).slice(0, 2);

    // Beregn totalpoeng fra de to høyeste intensitetene og legg til transfusjonspoengene
    const totalScore = topTwoIntensities.reduce((acc, item) => acc + item.score, 0) + transfusion;

    // Bestem klassifiseringen basert på poengsum
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

    // Vis resultatet og skalaen
    document.getElementById('result').innerHTML = `<div class="result-text ${colorClass}">${classification}</div><div>${lang === 'en' ? 'Your score' : 'Din poengsum'}: ${totalScore}/30</div>`;
    document.getElementById('scale-container').style.display = 'block';

    // Oppdater skalaindikatoren
    const scoreMarker = document.getElementById('score-marker');
    const percentage = (totalScore / 30) * 100;
    scoreMarker.style.left = `calc(${percentage}% - 10px)`;
});

// Språkvekslings-funksjonalitet
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en';  // Standard språk

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en';  // Bytt språk basert på knapp
        updateLanguage(lang);

        // Fremhev valgt knapp med mørkere blåfarge
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
