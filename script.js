document.getElementById('pollForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const votes = {};
    let allAnswered = true;

    // Collect all selected options
    ['q1','q2','q3','q4','q5','q6'].forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (!selected) allAnswered = false;
        else votes[q] = selected.value;
    });

    if (!allAnswered) {
        alert("Please answer all questions!");
        return;
    }

    // Submit votes to Supabase
    for (const [question, option] of Object.entries(votes)) {
        const { data: existing } = await supabase
            .from('votes')
            .select('*')
            .eq('question', question)
            .eq('option', option)
            .single();

        if (existing) {
            await supabase
                .from('votes')
                .update({ count: existing.count + 1 })
                .eq('question', question)
                .eq('option', option);
        } else {
            await supabase
                .from('votes')
                .insert({ question: question, option: option, count: 1 });
        }
    }

    window.location.href = 'result.html';
});
