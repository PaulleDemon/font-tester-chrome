import React from "react"
import ReactDOM from "react-dom/client"

window.React = React

import "./styles/tailwind.css"
import "./styles/index.css"

import App from "./App"


const root = ReactDOM.createRoot(document.getElementById('font-selector-root'))
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)

