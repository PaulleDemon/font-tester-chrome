
import React, { useCallback, useEffect, useRef, useState } from "react"

import { Select, Slider, Tabs, Tooltip, Button, message, Tag } from "antd"
import {
	AimOutlined,
	CloseOutlined, CrownFilled,
	FilterOutlined,
	FilterTwoTone,
	GithubFilled, HighlightOutlined, HolderOutlined, ItalicOutlined,
	QuestionCircleOutlined, RetweetOutlined, SettingFilled, SettingOutlined, ShareAltOutlined,
	UnderlineOutlined, UndoOutlined
} from "@ant-design/icons"

import { useMovable } from "./utils/hooks"

import Fonts from "./db/google-fonts.json"
import CodeSection from "./components/codeSection"

import Share from "./utils/share"
import Premium from "./utils/premium"
import Settings from "./components/settings"

import { getRangeSelectedNodes } from "./utils/selection"
import { randomInt } from "./utils/utils"
import { useSettingsContext } from "./context/settingsContext"


// import { ReactComponent as BMC } from './assets/logos/bmc.svg'


// const bmcBase64 = `data:image/svg+xml;base64,${BMC.toString('base64')}`
// some websites such as StackOverflow keeps interfering with local image paths, so added github raw content
const BMC_IMG = `https://raw.githubusercontent.com/PaulleDemon/landing-pages-browsable/main/src/assets/images/brand-logos/bmc.svg`


const importAll = (r) => {
	return r.keys().map((item) => {
	  const url = r(item)  // Get the image URL
	  const name = item.replace('./', '')
						.replace(/\.[^/.]+$/, '')
						.replace(/_/g, ' ')  // Remove './' and the file extension
	  return { name, url }  // Return name and the normal URL initially
	})
  }

const FontImages = importAll(require.context('./assets/font-images', false, /\.(png|jpe?g|svg)$/));


const defaultPosition = {
	x: (window.innerWidth - 300) - 25,
	y: (window.innerHeight - 750) - 15
}


// TODO: prevent selection on the modal
function App({ container }) {

	const widgetRef = useRef()
	const selectionFontPreview = useRef()
	const selectDropDownRef = useRef()
	const filterDropDownRef = useRef()

	const { position, handleMouseDown } = useMovable({ x: defaultPosition.x, y: defaultPosition.y }) // set the current position, if useEffect is used, recursion error occurs

	const [filter, setFilter] = useState([])
	const [showFilter, setShowFilter] = useState(false)

	const [fontCategoryOptions, setFontCategoryOptions] = useState([])

	const {settings} = useSettingsContext()

	const [enableSelection, setEnableSelection] = useState(true)

	const [findFontEnabled, setFindFontEnabled] = useState(false)

	const [fontOptions, setFontOptions] = useState([])
	const [currentFont, setCurrentFont] = useState({
		family: "",
		category: "",
		fontWeight: "normal",
		lineHeight: "normal",
		underline: false,
		italics: false
	})


	useEffect(() => {

		// parse and transform the json fonts to a format that can be put into autocomplete dropdown
		if (Fonts.length > 0) {
			const uniqueCategories = [...new Set(Fonts.map(font => font.category))]

			const categoriesOption = uniqueCategories.map(category => ({
				label: category,
				value: category
			}))

			setFontCategoryOptions(categoriesOption)

		}

	}, [Fonts])


	useEffect(() => {

		const renderFontImage = (family) => {

			const imageEquivalent = FontImages.find((val) => family === val.name)
		
			// console.log("image equivalent: ", family, imageEquivalent, settings.previewFonts)
		
			let label = family
		
			if (imageEquivalent && settings.previewFonts){
				label = (<div className="tw-h-full tw-w-full">
							<img src={imageEquivalent.url} alt={family} className="tw-h-full tw-object-contain" />
						</div>)
			}
		
			return ({
				label: label,
				value: family
			})
		}

		// parse and transform the json fonts to a format that can be put into autocomplete dropdown
		if (Fonts.length > 0) {

			let transformedFonts

			if (filter.length > 0){
				transformedFonts = Fonts.filter((value) => filter.includes(value.category))
									.map((x, index) => (renderFontImage(x.family)))


			}else{
				transformedFonts = Fonts.map((x, index) => (renderFontImage(x.family)))
			}

			setFontOptions(transformedFonts)
		}

	}, [filter, Fonts, settings?.previewFonts])



	useEffect(() => {
		// check if the font cdn style link exists, else add the link once
		const fontsLink = document.querySelector("#font-selector-link")

		const styleElement = document.createElement('style')
		if (!fontsLink) {
			styleElement.id = "font-selector-link"
			document.head.appendChild(styleElement)
		}

		return () => {
			if (fontsLink) {
				styleElement.remove()
			}
		}

	}, [])

	useEffect(() => {
		
		
		const hideFilterDropDown = (event) => {
			// console.log("Hide: ", event.target, event.composedPath(), event.target.classList, filterDropDownRef.current?.nativeElement.contains(event.target))
			
			const eventTarget = event.target

			if (showFilter && 
					!filterDropDownRef.current?.nativeElement.contains(eventTarget) &&
					!eventTarget.classList.contains("ant-select-dropdown") &&
					!eventTarget.classList.contains("ant-select-item-option-content")
				){
				setShowFilter(false)
			}
		}

		if (showFilter){
			setTimeout( () => container.addEventListener("click", hideFilterDropDown), 10)
		}else{
			container.removeEventListener("click", hideFilterDropDown)
		}

		return () => {
			container.removeEventListener("click", hideFilterDropDown)
		}

	}, [filterDropDownRef, showFilter])

	useEffect(() => {

		window.document.addEventListener("selectionchange", updateSelection)

		return () => {
			window.document.removeEventListener("selectionchange", updateSelection)
		}

	}, [enableSelection])

	useEffect(() => {

		// update font styles like, weight, line height, underline and more 
		if (currentFont.family !== "" && selectionFontPreview.current) {
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

		if (!selectedText) {
			return
		}
		const range = selection.getRangeAt(0)

		// also for wrapping elements, see https://stackoverflow.com/questions/6328718/how-to-wrap-surround-highlighted-text-with-an-element
		const selectedNodes = getRangeSelectedNodes(range)

		selectedNodes.forEach(node => {
			if (node.nodeType === node.ELEMENT_NODE) {
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

		const fontIndex = Fonts.findIndex(val => val.family === value)

		if (fontIndex === -1) return

		const fontFamily = Fonts[fontIndex].family
		const fontCategory = Fonts[fontIndex].category

		const styleElement = document.querySelector("#font-selector-link")
		const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}`
		styleElement.innerHTML = `@import url(${url})`

		// setTimeout(() => {
		// 	selectionFontPreview.current.style.fontFamily = `${fontFamily}, ${fontCategory}`
		// }, 100)

		setCurrentFont({
			...currentFont,
			family: fontFamily,
			category: fontCategory
		})
	}

	// TODO: handle Hover on option
	const cycleFontsWithKeys = (event) => {

		if (!settings.cycleFonts)
			return

		const key = event.key
    	let currentIndex = fontOptions.findIndex(option => option.value === currentFont.family)

		console.log("current index: ", currentIndex)

		// if (currentIndex === -1){
		// 	currentIndex = 0
		// }

		if (key === 'ArrowDown') {
			// Move to the next font
			const nextIndex = (currentIndex + 1) % fontOptions.length;
			console.log("next index: ", nextIndex, fontOptions[nextIndex])
			setCurrentFont({
							...currentFont,
							family: Fonts[nextIndex].family, 
							category: Fonts[nextIndex].category
						});
		} else if (key === 'ArrowUp') {
			// Move to the previous font
			const prevIndex = (currentIndex - 1 + fontOptions.length) % fontOptions.length;
			setCurrentFont({
				...currentFont,
				family: Fonts[prevIndex].family, 
				category: Fonts[prevIndex].category
			});
		}


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

	function randomFont() {

		const randomType = Fonts[randomInt(0, Fonts.length)]

		setCurrentFont(prev => ({
			...prev,
			family: randomType.family,
			category: randomType.category,
		}))

	}


	return (
		<div ref={widgetRef} className="tw-bg-white tw-text-base tw-overflow-hidden tw-text-black tw-flex tw-flex-col tw-shadow-xl tw-p-3 tw-rounded-xl"
			style={{
				position: "fixed",
				top: position.y,
				left: position.x,
				right: "auto",
				bottom: "auto",
				width: "300px",
				height: "750px",
				zIndex: 1000000000 // alway stay on top
			}}>
			<div className="tw-flex !tw-select-none tw-items-center tw-w-full tw-justify-between">
				<div className="tw-bg-[#f4f4f4] tw-cursor-move tw-p-1 tw-px-3 tw-rounded-md"
					onMouseDown={handleMouseDown}	>
					<HolderOutlined />
				</div>

				<div className="tw-flex tw-gap-1">
						<Settings
							className="tw-cursor-pointer hover:!tw-text-black hover:tw-bg-gray-100 tw-px-2 tw-rounded-md  tw-p-1">
							<Tooltip title="Settings" overlayStyle={{ zIndex: 1200000000 }}>
								<SettingOutlined />
							</Tooltip>
						</Settings>
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

					<div className="tw-flex tw-justify-between tw-place-content-center">
						<h2 className="tw-text-lg">Google fonts</h2>
						<div className="tw-relative">
							<Tooltip title="Filter fonts" overlayStyle={{ zIndex: 1200000000 }}>
								<Tag.CheckableTag checked={showFilter}
									onClick={() => setShowFilter(!showFilter)}
									// onChange={(val) => setShowFilter(val)}
									className={` 
												${filter.length > 0 ? "!tw-border-[#2076c7] !tw-bg-gray-100" : "!tw-border-transparent"}
												!tw-border-[1px] !tw-border-solid 
												!tw-text-lg hover:!tw-bg-gray-100
												hover:!tw-color-black tw-relative
											`}
									style={{
										outline: "none", border: "none", color: "#000",
										backgroundColor: "transparent", display: "flex",
										justifyContent: "center",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
									}}>
										
										{
											filter.length > 0 ?
												<FilterTwoTone />
												:
												<FilterOutlined />
										}
										
								</Tag.CheckableTag>
							</Tooltip>
						
							{
								showFilter && (
									<div className="tw-absolute tw-bg-white tw-right-0 tw-top-10 tw-p-2  
												tw-w-[200px] tw-h-fit tw-shadow-xl tw-rounded-md tw-max-h-[100px]"
										style={{ zIndex: 1300000000 }}
									>
										<Select
											mode="multiple"
											allowClear
											ref={filterDropDownRef}
											dropdownStyle={{ zIndex: 1200000000 }}
											style={{
												width: '100%',
											}}
											// onBlur={() => setShowFilter(false)}
											placeholder="Filter by family"
											value={filter}
											onChange={(value) => setFilter(value)}
											options={fontCategoryOptions}
										/>

										
									</div>
								)
							}

						</div>
					</div>
					<div className="tw-flex tw-gap-1 tw-w-full">

						<Tooltip title="Pick random font" overlayStyle={{ zIndex: 1200000000 }}>
							<Button
								onClick={randomFont}
								className={`!tw-text-base hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{
									outline: "none", border: "none", color: "#000",
									backgroundColor: "transparent", display: "flex",
									justifyContent: "center",
									maxWidth: "40px",
									padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
								}}>
								<RetweetOutlined />
							</Button>
						</Tooltip>

						<Select showSearch
							ref={selectDropDownRef}
							value={currentFont.family}
							dropdownStyle={{ zIndex: 1200000000 }}
							options={fontOptions}
							placeholder="select font"
							onChange={onFontUpdate}
							onKeyDown={cycleFontsWithKeys}	
							style={{ width: "100%" }}
							filterOption={(input, option) =>
								(option?.value ?? '').toLowerCase().includes(input.toLowerCase())
							}
						/>

					</div>
					
					{/* <div className="tw-flex">
					</div> */}

				</div>

				<div className="tw-flex tw-flex-col tw-gap-1">
					<div className="tw-flex tw-flex-col">
						<span>Line Height</span>
						<Slider defaultValue={1}
							min={1} max={3}
							step={0.1}
							value={currentFont.lineHeight === "normal" ? 1 : currentFont.lineHeight}
							onChange={(val) => setCurrentFont({ ...currentFont, lineHeight: val })}
							tooltip={{ overlayStyle: { zIndex: 1200000000 } }}
						/>
					</div>

					<div className="tw-flex tw-flex-col">
						<span>Weight</span>
						<Slider defaultValue={400}
							min={100} max={900}
							step={100}
							value={currentFont.fontWeight === "normal" ? 400 : currentFont.fontWeight}
							onChange={(val) => setCurrentFont({ ...currentFont, fontWeight: val })}
							tooltip={{ overlayStyle: { zIndex: 1200000000 } }}
						/>
					</div>
				</div>

				<div className="tw-flex tw-flex-col tw-gap-1">

					<div className="tw-flex tw-gap-3">

						<Tooltip title="Italics" overlayStyle={{ zIndex: 1200000000 }}>
							<Tag.CheckableTag checked={currentFont.italics}
								onChange={(checked) => setCurrentFont({ ...currentFont, italics: checked })}
								className={`${currentFont.italics && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{
									outline: "none", border: "none", color: "#000",
									backgroundColor: "transparent", display: "flex",
									justifyContent: "center",
									padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
								}}>
								<ItalicOutlined />
							</Tag.CheckableTag>
						</Tooltip>
						<Tooltip title="Underline" overlayStyle={{ zIndex: 1200000000 }}>
							<Tag.CheckableTag checked={currentFont.underline}
								onChange={(checked) => setCurrentFont({ ...currentFont, underline: checked })}
								className={`${currentFont.underline && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{
									outline: "none", border: "none", color: "#000",
									backgroundColor: "transparent", display: "flex",
									justifyContent: "center",
									padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
								}}>
								<UnderlineOutlined />
							</Tag.CheckableTag>
						</Tooltip>

					</div>

					<div className="tw-flex tw-gap-3">

						<Tooltip title="Enable selection" overlayStyle={{ zIndex: 1200000000 }}>
							<Tag.CheckableTag checked={enableSelection}
								onChange={(checked) => { setEnableSelection(checked) }}
								className={`${enableSelection && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{
									outline: "none", border: "none", color: "#000",
									backgroundColor: "transparent", display: "flex",
									justifyContent: "center",
									padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
								}}>
								<HighlightOutlined />
							</Tag.CheckableTag>
						</Tooltip>

						<Tooltip title="Reset" overlayStyle={{ zIndex: 1200000000 }}>
							<button onClick={onReset} className="hover:!tw-bg-gray-100 hover:!tw-color-black"
								style={{
									outline: "none", border: "none", color: "#000",
									backgroundColor: "transparent",
									padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
								}}>
								<UndoOutlined />
							</button>
						</Tooltip>

						<Tooltip title="What font?" overlayStyle={{ zIndex: 1200000000 }}>
							<Tag.CheckableTag checked={findFontEnabled}
								onChange={(checked) => { setFindFontEnabled(checked) }}
								className={`${findFontEnabled && "!tw-bg-gray-100"} !tw-text-lg hover:!tw-bg-gray-100 hover:!tw-color-black`}
								style={{
									outline: "none", border: "none", color: "#000",
									backgroundColor: "transparent", display: "flex",
									justifyContent: "center",
									padding: "0.5rem 0.75rem", borderRadius: "0.375rem"
								}}>
								<AimOutlined />
							</Tag.CheckableTag>
						</Tooltip>

					</div>

					
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
								children: <CodeSection fontStyle={currentFont}
									type="import" />
							}
						]
					} />
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

export default React.memo(App)
