// Corrected JavaScript Code for Maximum IFT Score of 30
document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get values from the form for the two most frequent intensities and their respective frequencies
    const intensity1 = parseInt(document.getElementById('intensity1').value); // First most frequent intensity
    const intensity2 = parseInt(document.getElementById('intensity2').value); // Second most frequent intensity
    const transfusion = parseInt(document.getElementById('transfusion').value); // Transfusion score

    // Calculate the total score using two intensity-frequency pairs
    const score = (intensity1 * 3) + (intensity2 * 4) + transfusion;

    // Determine the bleeding classification based on the score
    let classification = '';
    if (score === 0) {
        classification = 'no bleeding';
    } else if (score >= 1 && score <= 5) {
        classification = 'mild bleeding';
    } else if (score >= 6 && score <= 10) {
        classification = 'moderate bleeding';
    } else if (score >= 11 && score <= 15) {
        classification = 'severe bleeding';
    } else if (score >= 16 && score <= 30) {
        classification = 'intractable bleeding';
    }

    // Display the result
    document.getElementById('result').textContent = `Your total grading is: ${score} (${classification})`;
});
