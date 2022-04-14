(function () {

  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  //  provide details to the Overworld constructor
  });
  overworld.init();

})();
// this function calls itself (fn(){...})();