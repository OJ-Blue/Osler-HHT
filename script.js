// Håndterer innsendelse av skjema og beregner score
document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Hent intensitetsverdier
    const intensities = [
        parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0),
        parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0)
    ];
    const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

    // Sorter for å få de to høyeste verdiene
    const sortedIntensities = intensities.sort((a, b) => b - a);
    const firstIntensity = sortedIntensities[0] || 0;
    const secondIntensity = sortedIntensities[1] || 0;

    // Beregn score
    const score = (
