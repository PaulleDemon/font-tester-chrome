import { useEffect, useState } from "react"

import { Modal, Switch } from "antd"
import { CrownFilled, InfoCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons"
import Premium from "../utils/premium"
import { useSettingsContext } from "../context/settingsContext"


function Settings({children, className=""}){

    const [fontModalOpen, setFontModalOpen] = useState(false)

    const {settings, setSettings} = useSettingsContext()

    const onClick = () => {
        setFontModalOpen(true)
    }

    const onClose = (event) => {
        event.stopPropagation()
        setFontModalOpen(false)
    }

    const handleSettingsChange = (key, value) => {

        const updatedSettings = {
            ...settings,
            [key]: value
        }

        setSettings(updatedSettings)

		chrome.runtime?.sendMessage({ action: 'saveSettings', settings: updatedSettings })
        
    }

    const footer  = (
        <div className="tw-flex tw-w-full tw-justify-between">
            <a href="https://github.com/PaulleDemon/font-tester-chrome" 
                target="_blank" rel="noopener noreferrer">
                <span>About</span> 
                &nbsp;  
                <InfoCircleOutlined /> 
            </a>
            <a href="https://github.com/PaulleDemon/font-tester-chrome" 
                target="_blank" rel="noopener noreferrer">
                <span>Help</span> 
                &nbsp;  
                <QuestionCircleOutlined /> 
            </a>
        </div>
    )

    return (
        <div onClick={onClick} className={className}>
            {children}
            <Modal title={<h3 className="tw-text-xl tw-font-medium">Settings</h3>} 
                    styles={{wrapper: {zIndex: 1400000000, gap: "10px"}}}
                    onCancel={onClose}
                    onOk={onClose}
                    footer={footer}
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
                        <Switch value={settings.cycleFonts} 
                                onChange={(value) => handleSettingsChange('cycleFonts', value)}
                            />
                    </div>

                    <div className="tw-flex tw-gap-2 tw-place-items-center">
                        <div className="tw-text-base tw-font-medium">Preview font on dropdown</div>
                        <Switch value={settings.previewFonts} 
                                onChange={(value) => handleSettingsChange('previewFonts', value)}
                            />
                    </div>

                </div>

            </Modal>

        </div>
    )

}

export default Settings