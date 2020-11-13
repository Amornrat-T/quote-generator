const quoteContainer = document.getElementById ("quote-container");
const quoteText = document.getElementById ("quote");
const authorText = document.getElementById ("author");
const twitterBtn = document.getElementById ("twitter");
const newQuoteBtn = document.getElementById ("new-quote");
const loader = document.getElementById ("loader");

//show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function compelete() {
    if (!loader.hidden) {
      loader.hidden = true;
      quoteContainer.hidden = false;
    } 
}

// get quote from API
async function getQuote() {

    loading();

    const proxyUrl = 'https://pure-dusk-29482.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
      const response = await fetch (proxyUrl + apiUrl);
      const data = await response.json();

      //unknown author
      if (data.quoteAuthor === '' ) {
          authorText.innerText = 'Unknown'
      } else {
        authorText.innerText = data.quoteAuthor;
      }

      //reduce font size for long quotes
      if (data.quoteText.length > 120) {
            quoteText.classList.add ('.long-text');
      } else {
            quoteText.classList.remove ('.long-text');
      }
      quoteText.innerText = data.quoteText
      
      //stop loader and show the quote
      compelete();
       
    } catch (err) {
        getQuote();
        console.log (err);
    }
}

//tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open( twitterUrl, '_blank' );
}

//event listener
twitterBtn.addEventListener('click', tweetQuote );
newQuoteBtn.addEventListener ('click', getQuote );

//on load 

getQuote();