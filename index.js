function callWhenReadyToGo (cb) {
  // Callback function to execute when mutations are observed
  var callback = function (mutationsList) {
    // iterate through mutated dom elements
    for (var mutation of mutationsList) {
      // was an element removed
      if (mutation.removedNodes.length > 0) {
        // grab the class names
        var deletedClassList = mutation.removedNodes[0].classList.value
        // regexp to look for load or spin
        var regexp = /load|spin/gi
        // does the element have the above names in class list
        var matchedClass = deletedClassList.match(regexp)
        // grab the text of the element being removed
        var eleText = mutation.removedNodes[0].textContent
        // does the removed element have the above words (load or spin)
        var matchedText = eleText.match(regexp)
        // grab the id of the element
        var eleID = mutation.removedNodes[0].id
        var matchedID = []
        // is element ID present and does it contain load or spin
        if (eleID.length > 0) matchedID = eleID.match(regexp)
        // if any of the instances are true we have a loader
        if (matchedClass.length > 0 || matchedText.length > 0 || matchedID.length > 0) {
          // call the callback if a loader was removed
          cb()
        }
      }
    }
  }

  // Create an observer instance linked to the callback function
  var observer = new MutationObserver(callback)
  // Options for the observer (which mutations to observe)
  var config = { childList: true, subtree: true }
  // Start observing the target node for configured mutations
  observer.observe(document.body, config)
}

callWhenReadyToGo(testCallback)
