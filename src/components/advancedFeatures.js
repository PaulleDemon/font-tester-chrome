import { useMemo, useRef } from "react"

import { CopyOutlined, CrownFilled } from "@ant-design/icons"

import { InputNumber, message, Select, Slider } from "antd"
import Premium from "../utils/premium"


const FontSizeUnits = [
    {label: "px", value: "px"},
    {label: "pt", value: "pt"},
    {label: "rem", value: "rem"},
    {label: "em", value: "em"},
]

/**
 * 
 * @param {{fontStyle: object, type: "import"|"link"}} param0 
 * @returns 
 */
function AdvancedFeatures() {

    return (
        <Premium>
            <div className="tw-absolute tw-bg-white tw--left-[120px] tw-border-solid
                            tw-border-[2px] tw-border-gray-200 tw-py-4
                            tw-top-10 tw-p-2  tw-flex tw-flex-col tw-gap-2
                            tw-w-[250px] tw-h-fit tw-shadow-xl tw-rounded-md tw-max-h-[300px]"
                style={{ zIndex: 1300000000 }}
            >

                <CrownFilled className="tw-absolute tw-top-2 tw-right-2 tw-text-purple-600"/>

                <div className="tw-flex tw-flex-col tw-gap-1">
                    <div className="tw-font-medium tw-text-sm">
                        Font size
                    </div>
                    <div className="tw-flex tw-gap-1">
                        <InputNumber value={18} className="tw-w-fit tw-max-w-[60px]"/>
                        <Select options={FontSizeUnits} defaultValue={"px"}/>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1">
                    <div className="tw-font-medium tw-text-sm">
                        Font color
                    </div>
                    <div className="tw-flex tw-gap-1">
                        <div className="tw-w-[25px] tw-h-[25px] tw-rounded-full tw-bg-black"></div>
                    </div>
                </div>

                <div className="tw-flex tw-flex-col tw-gap-1">
                    <div className="tw-font-medium tw-text-sm">
                        Letter spacing
                    </div>
                    <div className="tw-flex tw-gap-1 tw-w-full">
                        <Slider min={0} value={3} max={10} 
                                className="tw-w-full"
                                tooltip={{ overlayStyle: { zIndex: 1200000000 } }}
                                />
                    </div>
                </div>
                <div className="tw-flex tw-flex-col tw-gap-1">
                    <div className="tw-font-medium tw-text-sm">
                        Underline spacing
                    </div>
                    <div className="tw-flex tw-gap-1 tw-w-full">
                        <Slider min={0} value={5} max={10} 
                                className="tw-w-full"
                                tooltip={{ overlayStyle: { zIndex: 1200000000 } }}
                                />
                    </div>
                </div>

            </div>
        </Premium>
    )
}

export default AdvancedFeatures