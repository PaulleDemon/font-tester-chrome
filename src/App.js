
import { useCallback, useEffect, useRef, useState } from "react"

import { Select, Slider, Tabs, Tooltip, Button, message, Tag } from "antd"
import { CloseOutlined, CrownFilled, 
		GithubFilled, HighlightOutlined, HolderOutlined, ItalicOutlined, 
		QuestionCircleOutlined, RetweetOutlined, ShareAltOutlined, 
		UnderlineOutlined, UndoOutlined } from "@ant-design/icons"

import { useMovable } from "./utils/hooks"

import Fonts from "./db/google-fonts.json"
import CodeSection from "./codeSection"

import Share from "./utils/share"
import Premium from "./utils/premium"
import { getRangeSelectedNodes } from "./utils/selection"
// import { ReactComponent as BMC } from './assets/logos/bmc.svg'


// const bmcBase64 = `data:image/svg+xml;base64,${BMC.toString('base64')}`
// some websites such as StackOverflow keeps interfering with local image paths, so added github raw content
const BMC_IMG = `https://raw.githubusercontent.com/PaulleDemon/landing-pages-browsable/main/src/assets/images/brand-logos/bmc.svg`


const defaultPosition = {
	x: (window.innerWidth - 300) - 25,
	y: (window.innerHeight - 700) - 15
}

// TODO: prevent selection on the modal
function App() {

	const widgetRef = useRef()
	const selectionFontPreview = useRef()


	const { position, handleMouseDown } = useMovable({ x: defaultPosition.x, y: defaultPosition.y}) // set the current position, if useEffect is used, recursion error occurs
	
	
	const [enableSelection, setEnableSelection] = useState(true)
	const [fontOptions, setFontOptions] = useState([])
	const [currentFont, setCurrentFont] = useState({
												family: "",
												category: "",
												fontWeight: "normal",
												lineHeight: "normal",
												underline: false,
												italics:  false
											})
	

	useEffect(() => {

		// parse and transform the json fonts to a format that can be put into autocomplete dropdown
		if (Fonts.length > 0){

			const transformedFonts = Fonts.map((x, index) => ({
				label: x.family,
				value: index
			}))
			setFontOptions(transformedFonts)
		}

	}, [Fonts])


	useEffect(() => {
		// check if the font cdn style link exists, else add the link once
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

	}, [enableSelection])

	useEffect(() => {

		// update font styles like, weight, line height, underline and more 
		if (currentFont.family !== "" && selectionFontPreview.current){
			const currentFontStyle = {
				fontFamily: `${currentFont.family}, ${currentFont.category}`,
				fontWeight: currentFont.fontWeight,
				lineHeight: currentFont.lineHeight,
				textDecoration: currentFont.underline ? 'underline' : 'none',
				fontStyle: currentFont.italics ? 'italic' : 'normal',
			}

			Object.assign(selectionFontPreview.current.style, currentFontStyle)

			document.querySelectorAll("[data-font-selector]").forEach(e => {
				// assign it to all the elements that the user had selected
				Object.assign(e.style, currentFontStyle)

			})

		}

	}, [currentFont, selectionFontPreview.current])


	const updateSelection = useCallback((evt) => {

		if (!enableSelection)
			return

		const selection = window.getSelection()
		const selectedText = selection.toString()

		if (!selectedText){
			return
		}
		const range = selection.getRangeAt(0)

		// also for wrapping elements, see https://stackoverflow.com/questions/6328718/how-to-wrap-surround-highlighted-text-with-an-element
		const selectedNodes = getRangeSelectedNodes(range)

		selectedNodes.forEach(node => {
			if (node.nodeType === node.ELEMENT_NODE){
				const defaultStyle = node.getAttribute("style")
				node.setAttribute("data-default-style", defaultStyle || "")
				node.setAttribute("data-font-selector", "true")
			}
		})

		selectionFontPreview.current.innerText = selectedText
	
	}, [enableSelection])

	const handleClose = () => {
		// console.log("run time: ", chrome.runtime)
		onReset() // reset the selection before closing
        chrome.runtime.sendMessage({ action: 'widgetClosed' })
    }

	const onFontUpdate = (value) => {
		
		const fontFamily = Fonts[value].family
		const fontCategory = Fonts[value].category

		const styleElement = document.querySelector("#font-selector-link")
		const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}`
		styleElement.innerHTML = `@import url(${url})`

		// setTimeout(() => {
		// 	selectionFontPreview.current.style.fontFamily = `${fontFamily}, ${fontCategory}`
		// }, 100)

		setCurrentFont({
			...currentFont,
			family: fontFamily,
			category:  fontCategory
		})
	}


	const onReset = () => {
		selectionFontPreview.current.innerText = "Selection Text"
		
		
		setCurrentFont({
			...currentFont,
			lineHeight: "normal",
			fontWeight: "normal",
			italics: false,
			underline: false,
		})

		document.querySelectorAll("[data-font-selector]").forEach(e => {
			// reset the styles
			const defaultStyle = e.getAttribute("data-default-style")

			e.setAttribute("style", defaultStyle)
			
			e.removeAttribute("data-default-style")
			e.removeAttribute("data-font-selector")
		})
		
	}

	function randomFont(){

		const randomType = Fonts[randomInt(0, Fonts.length)]

		setCurrentFont(prev => ({
			...prev, 
			family: randomType.family,
			category: randomType.category,
		}))

	}
	

	return (
		<div ref={widgetRef} className="tw-bg-white tw-overflow-hidden tw-text-black !tw-z-[100000] tw-flex tw-flex-col tw-shadow-xl tw-p-3 tw-rounded-xl" 
				style={{
					position: "fixed",
					top: position.y,
					left: position.x,
					right: "auto",
					bottom: "auto",
					width: "300px",
					height: "700px",
				}}>
			<div className="tw-flex !tw-select-none tw-items-center tw-w-full tw-justify-between">
				<div className="tw-bg-[#f4f4f4] tw-cursor-move tw-p-1 tw-px-3 tw-rounded-md"
					 onMouseDown={handleMouseDown}	>
					<HolderOutlined />
				</div>

				<div className="tw-flex tw-gap-1">
					<a href="https://github.com/PaulleDemon/font-tester-chrome?tab=readme-ov-file#font-tester---fonts-made-easy-chrome-extension" 
						target="_blank"
						rel="noopener noreferrer"
						className="tw-cursor-pointer hover:!tw-text-black hover:tw-bg-gray-100 tw-px-2 tw-rounded-md  tw-p-1">
						<QuestionCircleOutlined />
					</a>
					<div onClick={handleClose} className="tw-cursor-pointer hover:tw-bg-gray-100 tw-px-2 tw-rounded-md  tw-p-1">
						<CloseOutlined />
					</div>
				</div>
			</div>

			<div className="tw-w-full tw-p-2 tw-gap-2 tw-h-full tw-flex tw-flex-col">

				<div className="tw-h-[100px] tw-select-none tw-bg-[#f0f0f0ef] tw-rounded-lg tw-p-2  tw-min-h-[100px] tw-flex tw-flex-col tw-overflow-y-auto">
					<div ref={selectionFontPreview} 
							className=" tw-m-auto tw-text-[18px]"> {/*The font sizes are more explicit, because some website interfere with the font size*/}
						Selection Text
					</div>
				</div>
				<hr />
				<div className="tw-flex tw-flex-col tw-gap-1">
					<h2 className="tw-text-[18px]">Google fonts</h2>
					<div class="tw-flex tw-gap-2">
						<Select showSearch dropdownStyle={{zIndex: "11000"}} 
							options={fontOptions}
							placeholder="select font"
							onChange={onFontUpdate}
							filterOption={(input, option) =>
								(option?.label ?? '').toLowerCase().includes(input.toLowerCase())
							}
							/>
						
						<Tooltip title="Random fonts" overlayStyle={{zIndex: "12000"}}>
							<Button 
									onChange={randomFont}
									className={`!tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
									style={{outline: "none", border: "none", color: "#000", 
											backgroundColor: "transparent", display: "flex",
											justifyContent: "center",
											padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
								<RetweetOutlined />
							</Button>
						</Tooltip>
					</div>
				</div>

				<div className="tw-flex tw-flex-col tw-gap-1">
					<div className="tw-flex tw-flex-col">
						<span>Line Height</span>
						<Slider defaultValue={1} 
								min={1} max={3} 
								step={0.1}
								value={currentFont.lineHeight === "normal" ? 1 : currentFont.lineHeight}
								onChange={(val) => setCurrentFont({...currentFont, lineHeight: val})}
								tooltip={{overlayStyle: {zIndex: "12000"}}}
								/>
					</div>
				
					<div className="tw-flex tw-flex-col">
						<span>Weight</span>
						<Slider defaultValue={400} 
								min={100} max={900} 
								step={100}
								value={currentFont.fontWeight === "normal" ? 400 : currentFont.fontWeight}
								onChange={(val) => setCurrentFont({...currentFont, fontWeight: val})}
								tooltip={{overlayStyle: {zIndex: "12000"}}}
								/>
					</div>
				</div>
						  
				<div className="tw-flex tw-gap-3">

					<Tooltip title="Enable selection" overlayStyle={{zIndex: "12000"}}>
						<Tag.CheckableTag checked={enableSelection}
								onChange={(checked) => {setEnableSelection(checked)}}
								className={`${enableSelection && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent", display: "flex",
										justifyContent: "center",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
							<HighlightOutlined />
						</Tag.CheckableTag>
					</Tooltip>
					<Tooltip title="Italics" overlayStyle={{zIndex: "12000"}}>
						<Tag.CheckableTag checked={currentFont.italics}
								onChange={(checked) => setCurrentFont({...currentFont, italics: checked})}
								className={`${currentFont.italics && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent", display: "flex",
										justifyContent: "center",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
							<ItalicOutlined />
						</Tag.CheckableTag>
					</Tooltip>
					<Tooltip title="Underline" overlayStyle={{zIndex: "12000"}}>
						<Tag.CheckableTag checked={currentFont.underline}
								onChange={(checked) => setCurrentFont({...currentFont, underline: checked})}
								className={`${currentFont.underline && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent", display: "flex",
										justifyContent: "center",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
							<UnderlineOutlined />
						</Tag.CheckableTag>
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
								children: <CodeSection fontStyle={currentFont} 
														type="link"
														/>
							},
							{
								key: "@import",
								label: "@import",
								children: <CodeSection  fontStyle={currentFont} 
														type="import"/>
							}
						]
					}/>
				</div>

			</div>
			
			<div className="tw-flex tw-w-full tw-place-items-center tw-gap-2 tw-h-10 tw-justify-between">
				<a href="https://buymeacoffee.com/artpaul" 
					target="_blank" rel="noopener noreferrer">
					<img src={BMC_IMG} className="tw-w-8 tw-h-8" alt='BMC' />
				</a>
				<Share className="tw-w-8 tw-h-8 tw-cursor-pointer tw-flex tw-place-items-center">
					<ShareAltOutlined />
				</Share>
				<a href="https://github.com/PaulleDemon/font-tester-chrome" 
					target="_blank" className="hover:!tw-text-black !tw-text-black !tw-no-underline" rel="noopener noreferrer">
					<GithubFilled />
				</a>
				<Premium className="tw-w-8 tw-h-8 tw-cursor-pointer tw-flex tw-place-items-center tw-text-purple-500 tw-text-xl">
					<CrownFilled />
				</Premium>
			</div>

		</div>
	)
}

export default App
