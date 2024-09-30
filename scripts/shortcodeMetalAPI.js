document.addEventListener("DOMContentLoaded", function () {
  // Function to fetch the metal price from the API
  function fetchMetalPrice(metal, currency, element) {
    const apiUrl = `https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/${metal}/${currency}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0] && data[0].spreadProfilePrices[0].bid) {
          const price = data[0].spreadProfilePrices[0].bid;
          const formattedPrice = price.toFixed(2);
          element.textContent = formattedPrice; // Replace with the fetched price
        } else {
          element.textContent = "Price not available.";
        }
      })
      .catch(() => {
        element.textContent = "Error fetching metal price.";
      });
  }

  // Function to replace shortcodes
  function replaceShortcodes() {
    const shortcodeRegex = /\[metal_price metal="(.*?)" currency="(.*?)"\]/g;
    const elements = document.querySelectorAll("body *:not(script):not(style)");

    elements.forEach((el) => {
      const htmlContent = el.innerHTML;
      let match;
      while ((match = shortcodeRegex.exec(htmlContent)) !== null) {
        const metal = match[1];
        const currency = match[2];
        const newElement = document.createElement("span");

        // Fetch and replace shortcode with the price
        fetchMetalPrice(metal, currency, newElement);
        el.innerHTML = htmlContent.replace(match[0], newElement.outerHTML);
      }
    });
  }

  // Initial replace on document load
  replaceShortcodes();

  // Setup MutationObserver to detect new elements added to the DOM
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        replaceShortcodes(); // Re-run replace on new DOM content
      }
    });
  });

  // Start observing changes in the body
  observer.observe(document.body, { childList: true, subtree: true });
});
