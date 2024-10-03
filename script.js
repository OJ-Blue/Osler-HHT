<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Epistaxis Grading (IFT)</title>
   <style>
       body {
           font-family: 'Arial', sans-serif;
           background-color: #f9f9f9;
           color: #333;
           padding: 20px;
           max-width: 800px;
           margin: auto;
           line-height: 1.6;
       }

       h1 {
           color: #34495e;
           text-align: center;
           font-size: 2.5em;
           margin-bottom: 10px;
       }

       .description {
           color: #34495e;
           font-size: 1.2em;
           text-align: center;
           line-height: 1.5;
           padding: 15px;
           background-color: #f0f0f0;
           border-radius: 8px;
           box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
           margin-bottom: 20px;
       }

       label {
           font-weight: bold;
           margin-top: 15px;
           display: block;
           color: #34495e;
       }

       /* Language switch buttons now in the upper-right corner */
       .language-switch {
           text-align: right;
           margin-bottom: 20px;
           position: absolute;
           top: 20px;
           right: 20px;
       }

       .language-switch button {
           background-color: #34495e;
           color: white;
           border: none;
           padding: 10px 20px;
           cursor: pointer;
           margin-left: 5px;
           border-radius: 4px;
           font-size: 1em;
           transition: background-color 0.3s ease;
       }

       .language-switch button.active {
           background-color: #1a242f;
       }

       .language-switch button:hover {
           background-color: #2c3e50;
       }

       form {
           background-color: #ffffff;
           padding: 20px;
           border-radius: 8px;
           box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
           margin-bottom: 30px;
       }

       .option-group {
           margin-bottom: 15px;
       }

       .option-group input {
           margin-right: 10px;
       }

       button[type="submit"] {
           background-color: #3498db;
           color: white;
           padding: 10px 20px;
           border: none;
           cursor: pointer;
           margin-top: 20px;
           display: block;
           width: 100%;
           border-radius: 4px;
           font-size: 1.2em;
       }

       .result {
           text-align: center;
           margin-top: 20px;
           font-size: 1.8em;
           color: #333;
       }

       /* Result box with colored grading and white background */
       .result-text {
           margin-top: 10px;
           padding: 10px 15px;
           font-size: 1.5em;
           border-radius: 8px;
           display: inline-block;
           background-color: #ffffff; /* White background */
           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
       }

       /* Specific colors for grading results */
       .result-text.mild {
           color: #27ae60; /* Green for mild */
       }

       .result-text.moderate {
           color: #f39c12; /* Yellow/orange for moderate */
       }

       .result-text.severe {
           color: #e74c3c; /* Red for severe */
       }

       .result-text.intractable {
           color: #c0392b; /* Darker red for intractable */
       }

       /* Score scale */
       .scale-container {
           margin-top: 30px;
           text-align: center;
           display: none;
       }

       .score-scale {
           position: relative;
           height: 30px;
           background: linear-gradient(to right, #27ae60, #f39c12, #e74c3c);
           border-radius: 6px;
           margin-bottom: 15px;
       }

       .score-marker {
           position: absolute;
           top: -20px;
           width: 0;
           height: 0;
           border-left: 10px solid transparent;
           border-right: 10px solid transparent;
           border-bottom: 20px solid #34495e;
       }

       .score-labels {
           display: flex;
           justify-content: space-between;
           position: relative;
           top: -10px;
       }

       .score-label {
           font-weight: bold;
           color: #333;
           font-size: 1em;
       }

       /* Subtle color for footer */
       .acknowledgment {
           text-align: center;
           font-size: 0.9em;
           color: #555;
           background-color: #f0f0f0;
           padding: 15px;
           border-radius: 8px;
           margin-top: 40px;
       }

       /* Mobile responsiveness */
       @media (max-width: 600px) {
           body {
               padding: 10px;
           }

           form {
               padding: 15px;
           }

           .score-label {
               font-size: 0.8em;
           }
       }
   </style>
</head>
<body>

   <h1 id="page-title">Epistaxis Grading (IFT)</h1>

   <!-- Description -->
   <div class="description" id="description" data-en="IFT is a tool to grade the severity of nosebleeds in patients with hereditary hemorrhagic telangiectasia (Mb. Osler) during the last four weeks. The severity of the nosebleed episodes helps in guiding your treatment and follow-up by your physician." data-no="IFT er et verktøy for å vurdere alvorlighetsgraden av neseblødninger hos pasienter med hereditær hemoragisk telangiektasi (Mb. Osler) i løpet av de siste fire ukene. Alvorlighetsgraden av neseblødningsepisodene hjelper legen din med å veilede behandling og oppfølging.">
       IFT is a tool to grade the severity of nosebleeds in patients with hereditary hemorrhagic telangiectasia (Mb. Osler) during the last four weeks. The severity of the nosebleed episodes helps in guiding your treatment and follow-up by your physician.
   </div>

   <!-- Language Switch -->
   <div class="language-switch">
       <button id="english" class="active">English</button>
       <button id="norwegian">Norsk</button>
   </div>

   <form id="epistaxisForm">
       <!-- Intensity Questions -->
       <div class="option-group">
           <label id="q1" data-en="1. During the last 4 weeks, how many times did you get spots of blood or dripped a few drops?" data-no="1. I løpet av de siste 4 ukene, hvor mange ganger har du hatt blodflekker eller dryppet noen dråper?">1. During the last 4 weeks, how many times did you get spots of blood or dripped a few drops?</label>
           <input type="radio" name="intensity1" value="0"> <span data-en="None" data-no="Ingen">None</span><br>
           <input type="radio" name="intensity1" value="1"> <span data-en="1-5 times" data-no="1-5 ganger">1-5 times</span><br>
           <input type="radio" name="intensity1" value="2"> <span data-en="6-10 times" data-no="6-10 ganger">6-10 times</span><br>
           <input type="radio" name="intensity1" value="3"> <span data-en="11-27 times" data-no="11-27 ganger">11-27 times</span><br>
           <input type="radio" name="intensity1" value="4"> <span data-en="Daily or more" data-no="Daglig eller mer">Daily or more</span>
       </div>

       <!-- Repeat for questions 2 to 5 -->

       <div class="option-group">
           <label id="q5" data-en="5. Have you needed a blood transfusion due to nosebleeds in the last 4 weeks?" data-no="5. Har du trengt en blodoverføring på grunn av neseblødninger de siste 4 ukene?">5. Have you needed a blood transfusion due to nosebleeds in the last 4 weeks?</label>
           <input type="radio" name="transfusion" value="0"> <span data-en="No" data-no="Nei">No</span><br>
           <input type="radio" name="transfusion" value="1"> <span data-en="Yes" data-no="Ja">Yes</span><br>
           <input type="radio" name="transfusion" value="2"> <span data-en="Several times" data-no="Flere ganger">Several times</span>
       </div>

       <button id="submitBtn" type="submit" data-en="Calculate Score" data-no="Beregn poeng">Calculate Score</button>
   </form>

   <div id="result" class="result"></div>

   <!-- Score Scale (Initially hidden) -->
   <div id="scale-container" class="scale-container">
       <div class="score-scale">
           <div id="score-marker" class="score-marker" style="left: 0;"></div>
       </div>
       <div class="score-labels">
           <span class="score-label">0</span>
           <span class="score-label">10</span>
           <span class="score-label">20</span>
           <span class="score-label">30</span>
       </div>
   </div>

   <!-- Acknowledgment Section -->
   <div class="acknowledgment">
       <p>The Intensity, Frequency, and Need for Blood Transfusion Score (IFT) was created by Sinan Dheyauldeen, M.D., PhD and Gregor Bachmann-Harildstad, M.D., PhD. The online version was created by Ole Jakob Jørgensen, M.D.</p>
   </div>

   <script src="script.js"></script>
</body>
</html>
