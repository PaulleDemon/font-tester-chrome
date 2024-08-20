// Check if the container already exists
console.log("font selector: ", document.getElementById('font-selector-root'))
let script = null
if (!document.getElementById('font-selector-root')) {
    // Create a container for your React app

    const container = document.createElement('div');
    container.id = 'font-selector-root';
    // container.style.position = 'fixed';
    // container.style.top = '10px';
    // container.style.right = '10px';
    // container.style.width = "1000px"
    // container.style.height = "1000px"
    // container.style.zIndex = '10000';
    // container.style.backgroundColor = '#fff';
    document.body.appendChild(container);
  
    // Inject the React app
    script = document.createElement('script');
    script.src = chrome.runtime.getURL('index.js');
    script.setAttribute("id", "font-tester-script")
    console.log("YAA2", script.src)
    document.body.appendChild(script);
  } else {
    // Toggle visibility of the React app

  }
  