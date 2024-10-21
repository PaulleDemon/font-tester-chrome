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
import { SettingsProvider } from "./context/settingsContext"


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

			// allow arrow up and drown to be propagated so, select components can use arrows to cycle up and down 
			if (shadowActiveElement && ["ArrowUp", "ArrowDown", "Enter"].includes(event.key)) {
				// Allow event propagation for Ant Design Select components
				return;
			}
	
			if (shadowActiveElement) {
				event.stopPropagation();
			}
	
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
						<SettingsProvider>
							<App container={shadowRoot}/>
						</SettingsProvider>
					</ConfigProvider>
				</StyleProvider>
			</React.StrictMode>
		)
	}
}

init()