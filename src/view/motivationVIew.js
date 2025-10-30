class MotivationView {
  quoteText = document.querySelector(".quote");
  authorName = document.querySelector(".author");
  parentEL = document.querySelector(".motivation");

  getMotivationQuote(quote) {
    this.quoteText.textContent = quote.quote;
    this.authorName.textContent = `by ${quote.author}`;
  }

  displayError(err) {
    this.parentEL.innerHTML = `Oops sorry, ${err}. make sure you have a good internet connection!!😒`;
  }
}

export default new MotivationView();
