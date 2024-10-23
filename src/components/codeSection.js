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
function CodeSection({fontStyle, type="import"}){

    const codeRef = useRef()

    const { family: fontType, 
            category, fontWeight, 
            lineHeight, underline, italics } = fontStyle;

    
    const codeString = useMemo(() => {
        
        const fontFamily = `"${fontType}", ${category === "display"? "system-ui": category}`
        const fontURL = `https://fonts.googleapis.com/css2?family=${fontType.replace(/ /g, "+")}`

        const cssRule = [`\t\tfont-family: ${fontFamily};`]

        if (fontWeight !== "normal"){
            cssRule.push(`\t\tfont-weight: ${fontWeight};`)
        }

        if (lineHeight !== "normal"){
            cssRule.push(`\t\tline-height: ${lineHeight};`)
        }

        if (underline){
            cssRule.push(`\t\ttext-decoration: underline;`)
        }

        if (italics){
            cssRule.push(`\t\tfont-style: italic;`)
        }

        const fontCode = `
                    \t.${fontType.toLowerCase().replace(/ /g, "-")}-family{
                        ${cssRule.join("\n")}
                    \t}
        `

        if (type === "import"){
            return `<style>
                        \t@import url('${fontURL}');
                        ${fontCode}
                    </style>
                    `
        }else if(type === "link"){
            return `<link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="${fontURL}" rel="stylesheet">

                    <style>
                        ${fontCode}
                    </style>
                    `
        }

    }, [type, fontStyle])

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
                {fontType && formatCodeString(codeString)}
            </div>
        </div>
    )
}

export default CodeSection