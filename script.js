document.getElementById('pollForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    // 1️⃣ Get the selected radio inputs
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');

    // 2️⃣ Check if any question is unanswered
    if (!q1 || !q2 || !q3 || !q4) {
        alert("Please answer all questions!");
        return; // Stop submission
    }

    // 3️⃣ Get cumulative votes from localStorage or initialize
    const allVotes = JSON.parse(localStorage.getItem('allVotes')) || {
        q1: { Python:0, JavaScript:0, Java:0 },
        q2: { "VS Code":0, PyCharm:0, IntelliJ:0 },
        q3: { Google:0, Microsoft:0, Apple:0 },
        q4: { Android:0, iOS:0, Others:0 },
    };

    // 4️⃣ Increment votes for the selected options
    allVotes.q1[q1.value]++;
    allVotes.q2[q2.value]++;
    allVotes.q3[q3.value]++;
    allVotes.q4[q4.value]++;

    // 5️⃣ Save updated votes back to localStorage
    localStorage.setItem('allVotes', JSON.stringify(allVotes));

    // 6️⃣ Redirect to results page
    window.location.href = 'result.html';
});
