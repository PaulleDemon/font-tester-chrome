// Check if the container already exists
import React from "react"
import ReactDOM from "react-dom/client"

window.React = React

import "./styles/tailwind.css"
import "./styles/index.css"

import App from "./App"

// @depreciated - This one attaches directly on DOM not on shadowDOM, so the page style affects the widget style


(function () {
	if (!document.getElementById('font-selector-root')) {
		// Create a container for your React app

		const container = document.createElement('div')
		container.id = 'font-selector-root'
		document.body.appendChild(container)
		
		const root = ReactDOM.createRoot(container) // document.getElementById('font-selector-root')
		root.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>
		)
	} else {
		// Toggle visibility of the React app

	}
})()