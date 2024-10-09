document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Forhindre forminnsending

    // Hent verdiene fra spørsmål 1-4 (intensitet * frekvens)
    const intensity1 = 1 * parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0);
    const intensity2 = 2 * parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0);
    const intensity3 = 3 * parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0);
    const intensity4 = 4 * parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0);
    
    // Hent poeng fra spørsmål 5
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Samle intensitetsverdiene i en liste
    const intensityScores = [intensity1, intensity2, intensity3, intensity4];

    // Sorter intensitetene etter alvorlighetsgrad, og velg de to mest alvorlige
    const twoMostSevere = intensityScores.sort((a, b) => b - a).slice(0, 2);

    // Beregn totalpoeng: summen av de to mest alvorlige intensitetene + transfusjonspoeng
    const totalScore = twoMostSevere.reduce((acc, val) => acc + val, 0) + transfusion;

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
