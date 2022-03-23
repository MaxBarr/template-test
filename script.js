const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

//Show new Quote
function newQuote() {
    loading();
    // Pick a ramdom quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    //console.log(quote);
    //check if aothor file is blank and replace with Unknown
    if (!quote.author) {
        //authorText.textContent ='Unknown';
        authorText.innerText ='Unknown';
    } else {
        //authorText.textContent = quote.author;
        authorText.innerText = quote.author;
    }
    // check quote lenght to determine the styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //set quote, hide loader
    //quoteText.textContent = quote.text;
    quoteText.innerText = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        //alert(error)
        //Catch Error Here
    }
}

async function getQuotes2() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);
        newQuote();
    } catch (error) {
        getQuotes();
        console.log('whoops, no quote', error);
        //alert(error)
        //Catch Error Here
    }
}

//tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();
//newQuote();
//getQuotes2();
