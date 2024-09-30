document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Forhindre sideoppdatering ved innsending av skjemaet

    // Samle inn valgene for intensitetsnivåene
    const intensities = [
        parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0)
    ];
    
    // Samle inn transfusjonsverdien
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Sorter intensitetsnivåene for å finne de to høyeste
    const sortedIntensities = intensities.sort((a, b) => b - a);
    const firstIntensity = sortedIntensities[0] || 0;  // Høyeste intensitet
    const secondIntensity = sortedIntensities[1] || 0;  // Nest høyeste intensitet

    // Beregn poengsummen ved å multiplisere intensiteter og legge til transfusjonspoeng
    const score = (firstIntensity * 3) + (secondIntensity * 4) + transfusion;

    // Bestem blødningsklassifisering basert på poengsummen
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

    // Vis resultatet i skjemaet
    const resultElement = document.getElementById('result');
    resultElement.textContent = classification;
    resultElement.className = `result ${resultClass}`;
});

// Språkvekslingsfunksjonalitet
const langButtons = document.querySelectorAll('.language-switch button');
let lang = 'en';  // Startspråk er engelsk

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        lang = button.id === 'norwegian' ? 'no' : 'en';  // Veksle språk basert på knappen
        updateLanguage(lang);

        // Marker aktiv knapp
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    });
});

// Funksjon for å oppdatere språk i grensesnittet
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

