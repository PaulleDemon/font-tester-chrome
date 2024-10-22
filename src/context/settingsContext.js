import React, { createContext, useContext, useEffect, useState } from 'react';

const SettingsContext = createContext()

export const useSettingsContext = () => useContext(SettingsContext)

// Provider component to wrap around parts that needs upload context
export const SettingsProvider = ({ children }) => {
    
    const [settings, setSettings] = useState({
                                                darkTheme: false,
                                                cycleFonts: false, // cycle fonts with arrow
                                                previewFonts: true, // display fonts as image in dropdown 
                                            })

    useEffect(() => {

		chrome.runtime?.sendMessage({ action: 'getSettings' }, (response) => {
            
            if (response.success && response.settings){
                setSettings(response.settings)
            }

        })

    }, [])

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}