import { useState } from "react"

import { Modal } from "antd"
import { CrownFilled } from "@ant-design/icons"


function Premium({children, className=""}){

    const [premiumModalOpen, setPremiumModalOpen] = useState(false)


    const onClick = () => {
        setPremiumModalOpen(true)
    }

    const onClose = (event) => {
        event.stopPropagation()
        setPremiumModalOpen(false)
    }


    return (
        <div onClick={onClick} className={className}>
            {children}
            <Modal title={<h3 className="tw-text-xl tw-font-medium">Buy One Time License</h3>} 
                    styles={{wrapper: {zIndex: 14000, gap: "10px"}}}
                    onCancel={onClose}
                    onOk={onClose}
                    footer={null}
                    open={premiumModalOpen}>
                
                <div className="tw-mt-5 tw-text-lg tw-place-content-center tw-w-full tw-place-items-center">
                    I am Paul, an indie open-source dev, funding open-source projects by providing custom works. 
                    If you find this tool useful or are using for commercial works, 
                    consider buying a <b>one time license</b>. 
                    <br />
                    <br />
                    By buying license, you 
                    help me fund my upcoming open-source python tool. Plus you get all upcoming 
                    advance features, priority support, early access, upcoming Edge/Firefox Extension and
                    <a href="https://github.com/PaulleDemon/font-tester-chrome"
                        target="_blank" rel="noreferrer noopener" className="!tw-text-blue-500"
                    > more.</a> 
                </div>

                <a  href="https://github.com/PaulleDemon/font-tester-chrome"
                    target="_blank" rel="noreferrer noopener" 
                    className="tw-mt-8 !tw-bg-purple-500 !tw-text-white tw-gap-2 tw-text-lg tw-rounded-md !tw-font-semibold tw-w-full tw-flex tw-place-content-center tw-p-2 tw-mx-2">
                    <span>Buy License</span>
                    <CrownFilled />
                </a>

            </Modal>

        </div>
    )

}

export default Premium