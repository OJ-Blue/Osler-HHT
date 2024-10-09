document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Forhindre forminnsending

    // Hent frekvenspoengene fra spørsmål 1-4
    const freq1 = parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const freq2 = parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const freq3 = parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const freq4 = parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);

    // Beregn poengene for intensitet 1-4 ved å multiplisere intensitet med frekvens
    const score1 = 1 * freq1;  // Intensitet 1
    const score2 = 2 * freq2;  // Intensitet 2
    const score3 = 3 * freq3;  // Intensitet 3
    const score4 = 4 * freq4;  // Intensitet 4

    // Samle alle intensitetspoengene i en liste
    let scoresToConsider = [score1, score2, score3, score4];

    // Filtrer ut poeng med verdien 0 (intensiteter som ikke er valgt)
    scoresToConsider = scoresToConsider.filter(score => score > 0);

    // Hvis det kun er én intensitet valgt, bruk denne alene
    let totalScore = 0;
    if (scoresToConsider.length === 1) {
        totalScore = scoresToConsider[0];
    } else if (scoresToConsider.length > 1) {
        // Sorter poengene og velg de to høyeste intensitetene
        const twoHighestScores = scoresToConsider.sort((a, b) => b - a).slice(0, 2);
        totalScore = twoHighestScores.reduce((acc, val) => acc + val, 0);
    }

    // Hent poeng for spørsmål 5 (transfusjon)
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Legg transfusjonspoengene til totalsummen
    totalScore += transfusion;

    // Bestem epistaxis-graderingen basert på poengsummen
    let classification = '';
    let colorClass = '';  // Variabel for å lagre fargeklassen
    if (totalScore === 0) {
        classification = lang === 'en' ? 'No bleeding' : 'Ingen blødning';
        colorClass = 'mild';  // Grønn for ingen blødning
    } else if (totalScore >= 1 && totalScore <= 5) {
        classification = lang === 'en' ? 'Mild bleeding' : 'Mild blødning';
        colorClass = 'mild';  // Grønn for mild
    } else if (totalScore >= 6 && totalScore <= 10) {
        classification = lang === 'en' ? 'Moderate bleeding' : 'Moderat blødning';
        colorClass = 'moderate';  // Gul/oransje for moderat
    } else if (totalScore >= 11 && totalScore <= 15) {
        classification = lang === 'en' ? 'Severe bleeding' : 'Alvorlig blødning';
        colorClass = 'severe';  // Rød for alvorlig
    } else if (totalScore >= 16) {
        classification = lang === 'en' ? 'Intractable bleeding' : 'Ukontrollerbar blødning';
        colorClass = 'intractable';  // Mørkerød for ukontrollerbar
    }

    // Vis resultatet med riktig fargeklasse
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<div class="result-text ${colorClass}">${classification}</div><div>${lang === 'en' ? 'Your score' : 'Din poengsum'}: ${totalScore}/30</div>`;
    resultElement.style.display = 'block';  // Vis resultatdiven

    // Vis skalaen
    document.getElementById('scale-container').style.display = 'block';

    // Oppdater markøren på skalaen basert på poengsummen
    const scoreMarker = document.getElementById('score-marker');
    const percentage = (totalScore / 30) * 100;
    scoreMarker.style.left = `calc(${percentage}% - 10px)`;  // Juster for pilbredden
});

// Språkomkobling
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en';  // Standard språk

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en';  // Bytt språk basert på knappetrykk
        updateLanguage(lang);

        // Veksle aktiv klasse på knappene
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

    // Oppdater etiketter og spans
    const elementsToUpdate = document.querySelectorAll('[data-en]');
    elementsToUpdate.forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`);
    });
}
