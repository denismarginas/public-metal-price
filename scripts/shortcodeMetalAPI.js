/*
document.addEventListener("DOMContentLoaded", function () {
  function fetchMetalPrice(metal, currency) {
    const proxyUrl = "";
    const apiUrl = `https://forex-data-feed.swissquote.com/public-quotes/bboquotes/instrument/${metal}/${currency}`;

    fetch(proxyUrl + apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data && data[0] && data[0].spreadProfilePrices[0].bid) {
          const price = data[0].spreadProfilePrices[0].bid;
          const formattedPrice = price.toFixed(2);
          console.log(`Price: ${formattedPrice}`);
        } else {
          console.log("Price not available.");
        }
      })
      .catch(() => {
        console.log("Error fetching metal price.");
      });
  }

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

        fetchMetalPrice(metal, currency, newElement);
        el.innerHTML = htmlContent.replace(match[0], newElement.outerHTML);
      }
    });
  }

  replaceShortcodes();
M
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
        replaceShortcodes(); 
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
*/
