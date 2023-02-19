document.addEventListener('DOMContentLoaded', () => {
  const API_KEY = "YOUR API KEY";
  const translateButton = document.getElementById('translateButton');
  const biasedText = document.getElementById('biasedText');
  const unbiasedText = document.getElementById('unbiasedText');

  translateButton.addEventListener('click', () => {
    const apiUrl = `https://api.openai.com/v1/completions`;
    const prompt = `Replace the biased terms in this with unbiased terms: ${biasedText.value}`;
    const data = JSON.stringify({
      model: "text-davinci-003", 
      prompt,
      max_tokens: 1000,
      n: 1,
    });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`
    };
    
    fetch(apiUrl, {method: 'POST', headers, body: data})
      .then(response => {
        if (!response.ok) {
          throw new Error('Debiasing request failed.');
        }
        return response.json();
      })
      .then(data => {
        const result = data.choices[0].text.trim();
        unbiasedText.textContent = result;
      })
      .catch(error => {
        console.error(error);
      });
  });
});