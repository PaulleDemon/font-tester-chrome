(function() {
    console.log("active: ", window.fontSelectorInitialized)
    if (window.fontSelectorInitialized) {
        // Exit if the widget is already initialized
        return
    }
    
    class FontSelectorContainer {
        constructor() {

            this.widgetContainer = document.createElement("div")
            this.widgetContainer.id = 'my-extension-widget'
    
            const widgetStyle = {
                position: "fixed",
                bottom: "10px",
                right: "10px",
                width: "200px",
                padding: "10px",
                backgroundColor: "#ffffff",
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                zIndex: '1000',
                fontFamily: 'Arial, sans-serif'
            };
    
            Object.assign(this.widgetContainer.style, widgetStyle)

            document.body.appendChild(this.widgetContainer)
            this.initWidget()
        }

        initWidget(){
            this.widgetContainer.innerHTML = `

            <div style="color: black; display: flex; align-items: center; justify-content: space-between;">
                <span style="font-size: 16px; font-weight: bold;">Chosen Colors</span>
                <button id="close-widget" style="background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
            </div>
            <div style="margin-top: 10px;">
                <p style="margin: 0;">#E2E4E8  RGB(226, 228, 232)</p>
            </div>
            <div style="margin-top: 20px; background: linear-gradient(45deg, #ff7e5f, #feb47b); padding: 5px 0; text-align: center; border-radius: 5px;">
                <span style="color: white; font-size: 14px;">☆ Rate the Extension ☆</span>
            </div>
            `

            this.widgetContainer.querySelector('#close-widget').addEventListener('click', () => {
                window.fontSelectorInitialized = false
                this.widgetContainer.remove()
                chrome.runtime.sendMessage({ action: 'widgetClosed' })
            })
        }

        getContainer() {
            return this.widgetContainer
        }
    }

    // Set a flag to indicate initialization

    let existingWidget = document.querySelector('#my-extension-widget')

    if (!existingWidget) {
        new FontSelectorContainer().getContainer()
        window.fontSelectorInitialized = true
    } else {
        console.log('Widget already exists.')
    }
})()
