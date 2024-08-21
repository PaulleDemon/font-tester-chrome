import { CopyFilled, CopyOutlined } from "@ant-design/icons"


function CodeSection({font}){

    return (
        <div className="tw-rounded-md tw-relative tw-p-2 tw-bg-gray-100 tw-overflow-auto tw-min-h-[150px] tw-w-full tw-h-full">
            <div className="tw-absolute tw-right-2 tw-top-2">
                <button  className="hover:!tw-bg-gray-300 hover:!tw-color-black" 
								style={{outline: "none", border: "none", color: "#000", 
										backgroundColor: "transparent",
										padding: "0.5rem 0.75rem", borderRadius: "0.375rem"}}>
                    <CopyOutlined />
                </button>
            </div>
            wdwed
        </div>
    )
}

export default CodeSection