import { useMemo, useRef } from "react"

import { CopyOutlined } from "@ant-design/icons"

import { message } from "antd"


// for improvements refer: https://developers.google.com/fonts/docs/developer_api

/**
 * Formats literal strings, removes extra spaces, preserves tab spaces \t and new lines \n
 */
function formatCodeString(code) {
    return code.split('\n').map(line => line.replace(/^[ ]+|[ ]+$/g,'')).join('\n')
}

/**
 * 
 * @param {{fontStyle: object, type: "import"|"link"}} param0 
 * @returns 
 */
function WhatFontSection({fontFamily="", color="", fontSize=18}){

    const codeRef = useRef()

    // const { family: fontType, 
    //         category, fontWeight, 
    //         lineHeight, underline, italics } = fontStyle;

    
    const codeString = useMemo(() => {
        
        const cssRule = [`\t\tfont-family: ${fontFamily};`]

        if (color){
            cssRule.push(`\t\tcolor: ${color};`)
        }

        if (fontSize){
            cssRule.push(`\t\tfont-size: ${fontSize};`)
        }

        const fontCode = `
                    \t.${fontFamily.toLowerCase().replace(/ /g, "-")}-family{
                        ${cssRule.join("\n")}
                    \t}
        `

        return `
            ${fontCode}
        `

    }, [fontFamily, fontSize, color])

    const onCopy = () => {
        navigator.clipboard.writeText(codeRef.current?.innerText).then(function() {
            message.success({content: "Copied to clipboard"})  
    
        }, function(err) {
            message.error({content: "Error copying to clipboard"})
        })
    }

    return (
        <div className="tw-rounded-md tw-relative tw-p-1 tw-bg-gray-100 tw-text-wrap tw-overflow-y-auto 
                        tw-h-[150px] tw-w-full">
            <div className="tw-sticky tw-left-0 tw-top-2 tw-w-full tw-flex tw-place-content-end">
                <button onClick={onCopy} className="hover:!tw-bg-gray-300 hover:!tw-color-black" 

								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
                    <CopyOutlined />
                </button>
            </div>
            
            <div className="tw-whitespace-break-spaces tw-w-full tw-h-fit tw-text-gray-700" ref={codeRef}>
                {fontFamily && formatCodeString(codeString)}
            </div>
        </div>
    )
}

export default WhatFontSection