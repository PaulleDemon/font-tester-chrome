
import {useMovable} from "./utils/hooks"


// TODO: prevent selection on the modal
function App() {

	const { position, handleMouseDown } = useMovable({ x: 10, y: 10 })
	console.log("Finally")
	const handleClose = () => {
        chrome.runtime.sendMessage({ action: 'widgetClosed' });
    }
	
	return (
		<div className="tw-bg-green-500 tw-z-[10000] tw-flex tw-flex-col tw-shadow-xl tw-p-3 tw-rounded-xl" 
				style={{
					position: "fixed",
					bottom: "10px",
					right: "10px",
					width: "300px",
					height: "600px",
				}}>
			<div className="tw-flex tw-w-full tw-justify-between">
				<div className="tw-bg-gray-300">
					hii
				</div>
			</div>

		</div>
	)
}

export default App
