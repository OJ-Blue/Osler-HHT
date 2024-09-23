// script.js
document.getElementById('iftForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the values
    const intensity = parseInt(document.getElementById('intensity').value);
    const frequency = parseInt(document.getElementById('frequency').value);
    const transfusion = parseInt(document.getElementById('transfusion').value);

    // Calculate IFT Score
    const score = (intensity * frequency) + transfusion;

    // Determine severity level based on score
    let severity = '';
    if (score === 0) {
        severity = 'No bleeding';
    } else if (score >= 1 && score <= 5) {
        severity = 'Mild bleeding';
    } else if (score >= 6 && score <= 10) {
        severity = 'Moderate bleeding';
    } else if (score >= 11 && score <= 15) {
        severity = 'Severe bleeding';
    } else {
        severity = 'Intractable bleeding';
    }

    // Display result
    document.getElementById('result').textContent = `Your IFT Score is: ${score} (${severity})`;
});
