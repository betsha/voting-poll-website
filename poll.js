import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://llsbtmkwonzqzuimjpcy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxsc2J0bWt3b256cXp1aW1qcGN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0MTk2MjMsImV4cCI6MjA3ODk5NTYyM30.qdxSLEO5Erra9gsb_edgKDAHBjvOZlBsYtoZzsF3p18';
const supabase = createClient(supabaseUrl, supabaseKey);

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('pollForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const votes = {};
    let allAnswered = true;

    ['q1','q2','q3','q4','q5','q6'].forEach(q => {
      const selected = document.querySelector(`input[name="${q}"]:checked`);
      if (!selected) allAnswered = false;
      else votes[q] = selected.value;
    });

    if (!allAnswered) {
      alert("Please answer all questions!");
      return;
    }

    // Save votes to Supabase
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
});
