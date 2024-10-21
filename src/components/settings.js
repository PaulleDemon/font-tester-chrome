import { useEffect, useState } from "react"

import { Modal, Switch } from "antd"
import { CrownFilled } from "@ant-design/icons"
import Premium from "../utils/premium"


function Settings({children, className="", onSettingsChange}){

    const [fontModalOpen, setFontModalOpen] = useState(false)

    const [fontSettings, setFontSettings] = useState({
        darkTheme: false,
        cycleFonts: false, // cycle fonts with arrow
        previewFonts: false, // display fonts as image in dropdown 
    })


    const onClick = () => {
        setFontModalOpen(true)
    }

    const onClose = (event) => {
        event.stopPropagation()
        setFontModalOpen(false)
    }

    const handleSettingsChange = (key, value) => {

        const updatedSettings = {
            ...fontSettings,
            [key]: value
        }

        setFontSettings(updatedSettings)


		chrome.runtime.sendMessage({ action: 'saveSettings', settings: updatedSettings })
        

        onSettingsChange(updatedSettings)
    }

    return (
        <div onClick={onClick} className={className}>
            {children}
            <Modal title={<h3 className="tw-text-xl tw-font-medium">Settings</h3>} 
                    styles={{wrapper: {zIndex: 1400000000, gap: "10px"}}}
                    onCancel={onClose}
                    onOk={onClose}
                    footer={null}
                    open={fontModalOpen}>
                
                <div className="tw-mt-5 tw-text-lg tw-w-full
                                tw-place-content-center tw-flex tw-flex-col tw-gap-2">

                    <Premium>
                        <div className="tw-flex tw-gap-2 tw-place-items-center">
                            <div className="tw-text-base tw-font-medium">Dark theme</div>
                            <Switch value={false}
                                />
                            <CrownFilled className="tw-text-purple-500"/>
                        </div>
                    </Premium>
                    
                    <div className="tw-flex tw-gap-2 tw-place-items-center">
                        <div className="tw-text-base tw-font-medium">Cycle fonts with arrow keys</div>
                        <Switch value={fontSettings.cycleFonts} 
                                onChange={(value) => handleSettingsChange('cycleFonts', value)}
                            />
                    </div>

                    <div className="tw-flex tw-gap-2 tw-place-items-center">
                        <div className="tw-text-base tw-font-medium">Preview font on dropdown</div>
                        <Switch value={fontSettings.previewFonts} 
                                onChange={(value) => handleSettingsChange('previewFonts', value)}
                            />
                    </div>

                </div>

            </Modal>

        </div>
    )

}

export default Settings