chrome.runtime.onInstalled.addListener((reason) => {

	if (reason === 'install') {
		chrome.tabs.create({
		//   url: "onboarding.html"
		})
	}

})


// FIXME: isContentScript seems to be global, so sometimes if the extension 
// is opened on another webpage, we'll have to double click to open on other pages.
let isContentScriptInjected = false
// let tabId = null

chrome.action.onClicked.addListener((tab) => {
	// alert("action performed")
	// tabId = tab.id
	// console.log('Extension icon clicked, attempting to inject content.js...', isContentScriptInjected)
	if (!isContentScriptInjected) {
		// console.log("Running....")
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			files: ['content.js']
		}, (injectionResults) => {
			// failed to inject script
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message)
			} else {
				isContentScriptInjected = true
			}
		});
	} else {
		// Remove the content by re-executing the content script with a toggle function or a cleanup
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: removeContent
		}, () => {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message)
			} else {
				isContentScriptInjected = false
			}
		})
	}
})

function removeContent() {
	// Don't call this function directly from background.js instead call via, chrome.scripting.executeScript
	const injectedElement = document.getElementById('font-selector-root')
	const injectedScript = document.getElementById('font-tester-script')
	if (injectedElement) {
		injectedElement.remove()  // Remove the element if it exists
	}
	if (injectedScript){
		injectedScript.remove()
	}
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {


	if (message.action === 'saveSettings') {
        const settings = message.settings

		// console.log("settings: ", settings)

        // save settings to chrome.storage.sync
        chrome.storage.local.set({settings: settings}, () => {
            if (chrome.runtime.lastError) {
                console.error('Error saving settings:', chrome.runtime.lastError)
				sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
                // console.log('Settings saved successfully')
                sendResponse({ success: true })
            }
        })

        // Indicate that we'll send a response asynchronously
        return true
    }

	else if (message.action === "getSettings"){
		chrome.storage.local.get("settings", (result) => {
			if (chrome.runtime.lastError) {
				console.error('Error retrieving settings:', chrome.runtime.lastError)
            } else {
                // Send the settings to the content script
				sendResponse({ success: true, settings: result.settings })
            }
        })

		// !important return true if you plan to send response
        return true 
	}

    // if widget closed from content.js file, by clicking on the close button
	else if (message.action === 'widgetClosed') {
        // console.log("closed from content.js: ", sender.tab.id, sender)

        isContentScriptInjected  = false
		
		chrome.scripting.executeScript({
			target: { tabId: sender.tab?.id },
			function: removeContent
		}, () => {
			if (chrome.runtime.lastError) {
				console.error(chrome.runtime.lastError.message)
			} else {
				isContentScriptInjected = false
			}
		})
    }
})

chrome.runtime.setUninstallURL("https://tally.so/r/mKLXVX") // ask for feedback
