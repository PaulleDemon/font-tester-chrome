import React from "react"
import ReactDOM from "react-dom/client"
import root from 'react-shadow'

window.React = React


import tailwindStyles from './styles/tailwind.css'
import styles from './styles/index.css'

// Import Ant Design CSS
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'

import App from "./App"


// Function to create a style element with the provided CSS content
const createStyleElement = (cssContent) => {
    const styleTag = document.createElement('style')
    styleTag.textContent = cssContent
    return styleTag
}


function init() {
	const containerId = 'font-selector-root'
	const existingContainer = document.getElementById(containerId)

	if (!existingContainer) {
		// Create a container for your React app
		const container = document.createElement('div')
		container.id = containerId;
		document.body.appendChild(container)

		// Attach Shadow DOM
		const shadowRoot = container.attachShadow({ mode: 'open' })

		// Create a root element inside the shadow DOM
		const shadowRootContainer = document.createElement('div')
		shadowRootContainer.id = "font-selector-shadow-dom"
		shadowRoot.appendChild(shadowRootContainer)

		shadowRoot.appendChild(createStyleElement(tailwindStyles))
        shadowRoot.appendChild(createStyleElement(styles))
        
		document.body.appendChild(createStyleElement(styles)) // this is to ensure that the antd message is always on top

		shadowRoot.addEventListener('keydown', function(event) {
			// used to prevent webpage from hijacking focus on keydown, this happens in certain websites include Github.
			const shadowActiveElement = shadowRoot.activeElement;
			
			console.log("key down")
			
			// Check if the active element is inside the shadow DOM and belongs to extension
			if (shadowActiveElement) {
				console.log("key down2")
				// Let the event propagate within the shadow DOM but prevent the webpage from responding
			}
			// event.stopPropagation();
		}, true);

		const root = ReactDOM.createRoot(shadowRootContainer)

		root.render(
			<React.StrictMode>
				<StyleProvider container={shadowRoot}>
					<ConfigProvider 
						getPopupContainer={() => shadowRootContainer}
						theme={{
							components: {
								Message: {
									zIndexPopup: 1400000000
								}
							},
                        }}
						>
						<App container={shadowRoot}/>
					</ConfigProvider>
				</StyleProvider>
			</React.StrictMode>
		)
	}
}

init()