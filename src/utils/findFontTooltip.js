import { memo, useEffect, useRef, useState } from "react"
import { isPointOverText, rgbToHex } from "./utils"

import TargetCursor from "../assets/cursor/target.png"


const TOOLTIP_OFFSET = 15

const FindFontToolTip = ({ root, onClick }) => {
    const tooltipRef = useRef()
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [tooltipDimensions, setTooltipDimensions] = useState({ width: 0, height: 0 })

    const [fontDetails, setFontDetails] = useState({
        fontFamily: "",
        fontSize: "",
        fontWeight: "",
        fontColor: ""
    })

    useEffect(() => {

        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            body, body * {
                cursor: url('${TargetCursor}') 10 10, auto !important;
            }
        `   
        document.head.appendChild(styleElement);

        return () => {
            document.head.removeChild(styleElement);
        };

    }, [])

    useEffect(() => {
        const findFont = (event) => {
            if (isPointOverText(event.clientX, event.clientY)) {
                const element = document.elementFromPoint(event.clientX, event.clientY)
                if (element) {
                    const computedStyle = window.getComputedStyle(element)
                    const fontFamily = computedStyle.fontFamily || ""
                    const fontSize = computedStyle.fontSize || ""
                    const fontWeight = computedStyle.fontWeight || ""
                    const fontColor = rgbToHex(computedStyle.color)
    
                    setFontDetails({
                        fontFamily,
                        fontWeight,
                        fontSize,
                        fontColor
                    })
                }
            } else {
                setFontDetails('')
            }
    
            setMousePos({ x: event.clientX, y: event.clientY })
        }

        window.addEventListener("mousemove", findFont)

        return () => {
            window.removeEventListener("mousemove", findFont)
        }
    }, [onClick])

    useEffect(() => {

        function documentClicked(event) {
            
            if (event.target.shadowRoot !== root){
                event.preventDefault()
                event.stopPropagation()

                if (onClick)
                    onClick(fontDetails)
                
            }

        }

        window.addEventListener("click", documentClicked, true)

        return () => {
            window.removeEventListener("click", documentClicked, true)
        }

    }, [onClick, fontDetails])

    useEffect(() => {
        if (tooltipRef.current) {
            const { width, height } = tooltipRef.current.getBoundingClientRect()
            setTooltipDimensions({ width, height })
        }
    }, [fontDetails])

    // Calculate tooltip position
    const tooltipX = Math.min(
        mousePos.x + TOOLTIP_OFFSET,
        window.innerWidth - tooltipDimensions.width - TOOLTIP_OFFSET
    )
    const tooltipY = Math.min(
        mousePos.y + TOOLTIP_OFFSET,
        window.innerHeight - tooltipDimensions.height - TOOLTIP_OFFSET
    )

    // If the tooltip Y position goes above the mouse, adjust it
    const adjustedY = mousePos.y + tooltipDimensions.height + TOOLTIP_OFFSET < window.innerHeight
        ? tooltipY
        : mousePos.y - tooltipDimensions.height - TOOLTIP_OFFSET

    // console.log("font : ", typeof fontDetails.fontFamily, fontDetails.fontFamily?.length)

    return (
        <>
            <div ref={tooltipRef} 
                className="tw-pointer-events-none tw-fixed tw-left-0 tw-min-w-max tw-w-[350px] tw-max-h-[250px] tw-p-2 tw-overflow-hidden
                                    tw-h-fit tw-bg-[#000000da] tw-rounded-md tw-text-white tw-break-words
                                    tw-flex tw-flex-col tw-gap-2 tw-transition-all tw-duration-[0.1s]"
                style={{
                    top: adjustedY,
                    left: tooltipX,
                    zIndex: 14000000,
                    position: "fixed",
                    padding: fontDetails.fontFamily ? "0.5rem" : "0px",
                    width: fontDetails.fontFamily ? "350px" : "0px",
                    maxHeight: fontDetails.fontFamily ? "250px" : "0px",
                }}
            >
                <span className="tw-flex tw-gap-2">
                    <div className="tw-font-semibold">
                        Font family:
                    </div>
                    <div className="tw-break-words tw-max-w-[250px]">
                        {fontDetails.fontFamily}
                    </div>
                </span>
                <span className="tw-flex tw-gap-2">
                    <span className="tw-font-semibold">
                        Font size:
                    </span>
                    <span>
                        {fontDetails.fontSize}
                    </span>
                </span>
                <span className="tw-flex tw-gap-2">
                    <span className="tw-font-semibold">
                        Font weight:
                    </span>
                    <span>
                        {fontDetails.fontWeight}
                    </span>
                </span>
                <span className="tw-flex tw-gap-2">
                    <span className="tw-font-semibold">
                        Font color:
                    </span>
                    <span>
                        {fontDetails.fontColor}
                    </span>
                </span>
            </div>
        </>
    )
}

export default memo(FindFontToolTip)
