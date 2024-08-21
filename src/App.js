
import { useEffect, useRef, useState } from "react"

import { Select, Slider, Tabs, Tooltip, Button } from "antd"
import { BoldOutlined, CloseOutlined, CrownFilled, EllipsisOutlined, GithubFilled, HolderOutlined, ItalicOutlined, RestOutlined, UnderlineOutlined, UndoOutlined } from "@ant-design/icons"

import { useMovable } from "./utils/hooks"

import Fonts from "./db/google-fonts.json"
import CodeSection from "./codeSection"

import BMC from "./assets/logos/bmc.svg"
// import { ReactComponent as BMC } from './assets/logos/bmc.svg'


const BtnStyle = {

}

// TODO: prevent selection on the modal
function App() {

	const widgetRef = useRef()
	const selectionFontPreview = useRef()

	const { position, handleMouseDown } = useMovable({ x: 10, y: 10 })
	
	const [fontOptions, setFontOptions] = useState([])
	const [currentFont, setCurrentFont] = useState({
											family: "",
											category: ""
											})


	useEffect(() => {

		if (widgetRef.current && position){

			const pos = {
				top: `${position.y}px`,
				left: `${position.x}px`,
				right: `auto`,
				bottom: `auto`,
			}

			Object.assign(widgetRef.current.style, pos)
		}

	}, [position])

	useEffect(() => {

		if (Fonts.length > 0){

			const transformedFonts = Fonts.map((x, index) => ({
				label: x.family,
				value: index
			}))
			console.log("transformed: ", transformedFonts)
			setFontOptions(transformedFonts)
		}

	}, [Fonts])

	useEffect(() => {
		// check if the link exists, else add the link
		const fontsLink = document.querySelector("#font-selector-link")

		const styleElement = document.createElement('style')
		if (!fontsLink){
			styleElement.id = "font-selector-link"
			document.head.appendChild(styleElement)
		}

		return () => {
			if (fontsLink){
				styleElement.remove()
			}
		}

	}, [])

	useEffect(() => {

		window.document.addEventListener("selectionchange", updateSelection)

		return () => {
			window.document.removeEventListener("selectionchange", updateSelection)
		}

	}, [])

	const updateSelection = (evt) => {
		const selection = window.getSelection()
		const selectedText = selection.toString()

		if (!selectedText){
			return
		}
		console.log('Selected text:', selectedText)

		selectionFontPreview.current.innerText = selectedText
	}

	const handleClose = () => {
		console.log("run time: ", chrome.runtime)
        chrome.runtime.sendMessage({ action: 'widgetClosed' })
    }

	const onFontUpdate = (value) => {
		console.log("selected:", Fonts[value], value)
		const fontFamily = Fonts[value].family
		const fontCategory = Fonts[value].category

		const styleElement = document.querySelector("#font-selector-link")
		const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}`
		styleElement.innerHTML = `@import url(${url})`

		setTimeout(() => {
			selectionFontPreview.current.style.fontFamily = `${fontFamily}, ${fontCategory}`
		}, 100)

		setCurrentFont({
			family: fontFamily,
			category:  fontCategory
		})
	}
	const onSearch = (value) => {
		console.log('search:', value)
	}

	const onReset = () => {
		selectionFontPreview.current.innerText = "Selection Text"
	}
	
	return (
		<div ref={widgetRef} className="tw-bg-white tw-overflow-hidden tw-text-black tw-z-[10000] tw-flex tw-flex-col tw-shadow-xl tw-p-3 tw-rounded-xl" 
				style={{
					position: "fixed",
					right: "15px",
					bottom: "15px",
					width: "300px",
					height: "700px",
				}}>
			<div className="tw-flex tw-items-center tw-w-full tw-justify-between">
				<div className="tw-bg-[#f4f4f4] tw-cursor-move tw-p-1 tw-px-3 tw-rounded-md"
					 onMouseDown={handleMouseDown}	>
					<HolderOutlined />
				</div>

				<div onClick={handleClose} className="tw-cursor-pointer hover:tw-bg-gray-100 tw-px-2 tw-rounded-md  tw-p-1">
					<CloseOutlined />
				</div>
			</div>

			<div className="tw-w-full tw-p-2 tw-gap-2 tw-h-full tw-flex tw-flex-col">

				<div className="tw-h-[100px] tw-select-none tw-bg-[#f0f0f0ef] tw-rounded-lg tw-p-2  tw-min-h-[100px] tw-flex tw-flex-col tw-overflow-y-auto">
					<div ref={selectionFontPreview} 
							className=" tw-m-auto tw-text-xl">
						Selection Text
					</div>
				</div>
				<hr />
				<div className="tw-flex tw-flex-col tw-gap-1">
					<h2 className="tw-text-lg">Google fonts</h2>
					<Select showSearch dropdownStyle={{zIndex: "11000"}} 
						options={fontOptions}
						placeholder="select font"
						onChange={onFontUpdate}
						filterOption={(input, option) =>
							(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
						  }
						/>
				</div>

				<div className="tw-flex tw-flex-col tw-gap-1">
					<div className="tw-flex tw-flex-col">
						<span>Line Height</span>
						<Slider />
					</div>
				
					<div className="tw-flex tw-flex-col">
						<span>Weight</span>
						<Slider />
					</div>
				</div>
						  
				<div className="tw-flex tw-gap-3">
					<Tooltip title="Italics" overlayStyle={{zIndex: "12000"}}>
						
						<button className="hover:!tw-bg-gray-100 hover:!tw-color-black" 
								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
							<ItalicOutlined />
						</button>
					</Tooltip>
					<Tooltip title="Underline" overlayStyle={{zIndex: "12000"}}>
						<button className="hover:!tw-bg-gray-100 hover:!tw-color-black" 
								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
							<UnderlineOutlined />
						</button>
					</Tooltip>

					<Tooltip title="Reset" overlayStyle={{zIndex: "12000"}}>
						<button onClick={onReset} className="hover:!tw-bg-gray-100 hover:!tw-color-black" 
													style={{outline: "none", border: "none", color: "#000", 
															backgroundColor: "transparent",
															padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
							<UndoOutlined />
						</button>
					</Tooltip>

				</div>

				{/* <CodeSection /> */}
				<div className="tw-flex tw-w-full tw-h-full tw-max-h-[120px]">
					<Tabs className="tw-w-full tw-h-full" items={
						[
							{
								key: "link",
								label: "link",
								children: <CodeSection font={currentFont.family} 
														category={currentFont.category}
														type="link"
														/>
							},
							{
								key: "@import",
								label: "@import",
								children: <CodeSection  font={currentFont.family} 
														category={currentFont.category}
														type="import"/>
							}
						]
					}/>
				</div>

			</div>
			
			<div className="tw-flex tw-w-full tw-place-items-center tw-gap-2 tw-h-10 tw-justify-between">
				<a href="https://buymeacoffee.com/artpaul" 
					target="_blank" rel="noopener noreferrer">
					<img src={BMC} className="tw-w-8 tw-h-8" alt='BMC' />
				</a>
				<a href="https://github.com/PaulleDemon/font-tester-chrome" 
					target="_blank" rel="noopener noreferrer">
					<GithubFilled />
				</a>
				<a href="https://github.com/PaulleDemon" 
					className="tw-text-purple-500 tw-text-xl" target="_blank" rel="noopener noreferrer">
					<CrownFilled />
				</a>
			</div>

		</div>
	)
}

export default App
