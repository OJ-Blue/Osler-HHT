document.getElementById('epistaxisForm').addEventListener('submit', function(event) {
   event.preventDefault();

   // Collect intensity selections
   const intensities = [
       parseInt(document.querySelector('input[name="intensity1"]:checked')?.value || 0),
       parseInt(document.querySelector('input[name="intensity2"]:checked')?.value || 0),
       parseInt(document.querySelector('input[name="intensity3"]:checked')?.value || 0),
       parseInt(document.querySelector('input[name="intensity4"]:checked')?.value || 0),
   ];
   const transfusion = parseInt(document.querySelector('input[name="transfusion"]:checked')?.value || 0);

   // Automatically use the two highest intensities
   const sortedIntensities = intensities.sort((a, b) => b - a);
   const firstIntensity = sortedIntensities[0] || 0;
   const secondIntensity = sortedIntensities[1] || 0;

   // Calculate the total score using the two largest intensities
   const score = (firstIntensity * 3) + (secondIntensity * 4) + transfusion;

   // Determine the bleeding classification based on the score
   let classification = '';
   let resultClass = '';
   if (score === 0) {
       classification = lang === 'en' ? 'no bleeding' : 'ingen blødning';
       resultClass = 'mild';
   } else if (score >= 1 && score <= 5) {
       classification = lang === 'en' ? 'mild bleeding' : 'mild blødning';
       resultClass = 'mild';
   } else if (score >= 6 && score <= 10) {
       classification = lang === 'en' ? 'moderate bleeding' : 'moderat blødning';
       resultClass = 'moderate';
   } else if (score >= 11 && score <= 15) {
       classification = lang === 'en' ? 'severe bleeding' : 'alvorlig blødning';
       resultClass = 'severe';
   } else if (score >= 16 && score <= 30) {
       classification = lang === 'en' ? 'intractable bleeding' : 'ukontrollerbar blødning';
       resultClass = 'severe';
   }

   // Display the result in the selected language and with the appropriate classification
   const resultElement = document.getElementById('result');
   resultElement.textContent = classification;
   resultElement.className = 'result ' + resultClass;
});
