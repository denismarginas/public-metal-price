document.addEventListener("DOMContentLoaded", function () {
  var optionsGraph = {
    bullion: "gold",
    currency: "GBP",
    timeframe: "1d",
    chartType: "line",
    miniChartModeAxis: "oz",
    referrerID: "MYUSERNAME",
    containerDefinedSize: true,
    miniChartMode: true,
    displayLatestPriceLine: true,
    switchBullion: true,
    switchCurrency: true,
    switchTimeframe: true,
    switchChartType: true,
    exportButton: true,
  };

  var chart = new BullionVaultChart(optionsGraph, "graphMetal");

  // Event listener for clicking on timeframe links
  document.querySelectorAll(".timeframe").forEach(function (timeframeLink) {
    timeframeLink.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior
      var selectedTimeframe = this.getAttribute("timeframe"); // Get the timeframe from clicked element
      console.log("Selected Timeframe:", selectedTimeframe);

      // Update chart options with new timeframe
      optionsGraph.timeframe = selectedTimeframe;

      // Reinitialize the chart with the updated options
      chart = new BullionVaultChart(optionsGraph, "graphMetal");
    });
  });

  // Function to toggle prices based on selected bullion
  function togglePrices(activeClass) {
    // Hide all prices
    document
      .querySelectorAll(".current_price")
      .forEach(function (priceElement) {
        priceElement.classList.add("hide");
        priceElement.classList.remove("show");
      });

    // Show the active price
    var activePriceElement = document.querySelector(activeClass);
    if (activePriceElement) {
      activePriceElement.classList.remove("hide");
      activePriceElement.classList.add("show");
    }
  }

  // Event listeners for bullion buttons
  function selectBullion(selectedLabel, bullionType, priceClass) {
    // Set aria-selected to true for the clicked element and false for others
    document.querySelectorAll("[aria-selected]").forEach((el) => {
      el.setAttribute("aria-selected", "false"); // Reset all aria-selected attributes to false
    });

    selectedLabel.setAttribute("aria-selected", "true"); // Set selected element to true

    // Update the graph and prices
    optionsGraph.bullion = bullionType;
    chart = new BullionVaultChart(optionsGraph, "graphMetal");
    togglePrices(priceClass); // Show the relevant price
  }

  // Event listeners for bullion buttons
  document.querySelector("#label-gold").addEventListener("click", function () {
    selectBullion(this, "gold", ".current_price_gold");
  });

  document
    .querySelector("#label-silver")
    .addEventListener("click", function () {
      selectBullion(this, "silver", ".current_price_silver");
    });

  document
    .querySelector("#label-platinum")
    .addEventListener("click", function () {
      selectBullion(this, "platinum", ".current_price_platinum");
    });

  // Initially show the gold price
  togglePrices(".current_price_gold");

  // Event listener for currency selection
  document
    .querySelector("#label-currency")
    .addEventListener("change", function () {
      var selectedCurrency = this.value; // Get the selected currency
      optionsGraph.currency = selectedCurrency;

      // Reinitialize the chart with the updated options
      chart = new BullionVaultChart(optionsGraph, "graphMetal");
    });
});
