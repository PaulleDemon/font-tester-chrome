import { useState } from "react"

import { Modal } from "antd"
import { CrownFilled } from "@ant-design/icons"


function Premium({ children, className = "" }) {

    const [premiumModalOpen, setPremiumModalOpen] = useState(false)


    const onClick = () => {
        setPremiumModalOpen(true)
    }

    const onClose = (event) => {
        event.stopPropagation()
        setPremiumModalOpen(false)
    }

    return (
        <div onClick={onClick} className={`${className}`}>
            {children}
            <Modal
                title={<h3 className="tw-text-xl tw-font-medium">Fund development. Pre-order one Time License</h3>}
                style={{ zIndex: 1000000000, gap: '5px', placeItems: "center" }}
                className="max-xl:tw-max-w-full"
                onCancel={onClose}
                centered
                onOk={onClose}
                footer={null}
                width={'auto'}
                open={premiumModalOpen}
            >
                <div className="tw-mt-5 tw-text-lg tw-max-w-[850px]  tw-w-full ">
                    I am Paul, a indie open-source dev.
                    If you find this tool useful and want to fund and support it's development, consider buying a <b>one time license</b>.
                    <br />
                    <br />
                    By buying pre-order license, you get advance features, priority support, early access, upcoming features, and &nbsp;
                    <a
                        href="https://github.com/PaulleDemon/tab=readme-ov-file"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="!tw-text-blue-500"
                    >
                        more.
                    </a>
                </div>


                <section
                    className="tw-mt-5 tw-flex tw-w-full tw-max-w-[850px] tw-flex-col tw-place-items-center tw-p-[2%] max-lg:tw-p-2"
                    id="pricing"
                >
                    <h3
                        className="tw-text-4xl tw-font-medium max-md:tw-text-2xl"
                    >
                        Choose your plan
                    </h3>
                    <div
                        className="tw-mt-10 tw-flex tw-flex-wrap tw-place-content-center tw-gap-8 max-lg:tw-flex-col"
                    >
                        <div
                            className="tw-flex tw-w-[380px] tw-flex-col tw-border-2 tw-place-items-center tw-gap-2 tw-rounded-lg tw-p-8 tw-shadow-xl max-lg:tw-w-[340px]"
                        >
                            <h3 className="">
                                <span className="tw-text-5xl tw-font-semibold">$0</span>
                            </h3>
                            <p className="tw-mt-3 tw-text-base tw-text-center tw-text-gray-600">
                                Free to use forever, but for added features and to support open-source development, consider buying lifetime license.
                            </p>
                            <hr />
                            <ul
                                className="tw-mt-4 tw-flex tw-flex-col tw-gap-2 tw-text-lg tw-text-gray-600"
                            >
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600 tw-text-base"></i>
                                    <span>Select from 1000+ google fonts</span>
                                </li>

                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-question-circle-fill tw-text-red-600  tw-text-base"></i>
                                    <span>Lifetime updates</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-x-circle-fill tw-text-red-600  tw-text-base"></i>
                                    <span>Priority support</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-x-circle-fill tw-text-red-600  tw-text-base"></i>
                                    <span>Early access to new features</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-x-circle-fill tw-text-red-600  tw-text-base"></i>
                                    <span>Firefox, Safari and Edge addons (upcoming)</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-x-circle-fill tw-text-red-600  tw-text-base"></i>
                                    <span>Dark theme (upcoming)</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-x-circle-fill tw-text-red-600  tw-text-base"></i>
                                    <span>Adjust font-size and colors (upcoming)</span>
                                </li>
                            </ul>
                            {/* <a
                                target="_blank"
                                rel="noreferrer noopener"
                                href="https://chromewebstore.google.com/detail/font-tester/deachoodakeofjlfikfkohihnpcgiaim"
                                className="btn tw-mt-8 !tw-w-full tw-transition-transform tw-duration-[0.3s] hover:tw-scale-x-[1.02]"
                            >
                                Get now
                            </a> */}
                        </div>
                        <div
                            className="tw-flex tw-w-[380px] tw-flex-col tw-place-items-center tw-gap-2 tw-rounded-lg tw-border-2 
                                tw-border-blue-500 tw-p-8 tw-shadow-xl max-lg:tw-w-[340px]"
                        >
                            <div className=" tw-text-white tw-p-1 tw-px-3 tw-bg-blue-500  tw-rounded-full">
                                Limited time offer
                            </div>
                            <h3 className="">
                                <span className="tw-text-5xl tw-font-semibold">
                                    <s className="tw-font-medium tw-text-4xl">$49</s>
                                    <span>$19</span>
                                </span>
                                <span className="tw-text-2xl tw-text-gray-600 tw-ml-1">Forever</span>
                            </h3>
                            <p className="tw-mt-3 tw-text-center tw-text-gray-600">
                                Support open-source development 🚀. Plus get added benefits.
                            </p>
                            <hr />
                            <ul
                                className="tw-mt-4 tw-flex tw-flex-col tw-gap-2 tw-text-lg tw-text-gray-600"
                            >
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600 tw-text-base"></i>
                                    <span>Select from 1000+ google fonts</span>
                                </li>

                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600  tw-text-base"></i>
                                    <span>Lifetime updates</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600  tw-text-base"></i>
                                    <span>Priority support</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600  tw-text-base"></i>
                                    <span>Early access to new features</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600  tw-text-base"></i>
                                    <span>Firefox, Safari and Edge addons (upcoming)</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600  tw-text-base"></i>
                                    <span>Dark theme (upcoming)</span>
                                </li>
                                <li className="tw-flex tw-place-items-center tw-gap-2">
                                    <i className="bi bi-check-circle-fill tw-text-green-600  tw-text-base"></i>
                                    <span>Adjust font-size and colors (upcoming)</span>
                                </li>
                            </ul>
                        
                            <a
                                href="https://ko-fi.com/s/0460bd43e6"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="tw-mt-8 !tw-bg-purple-500 !tw-text-white tw-gap-2 tw-text-lg tw-rounded-md !tw-font-semibold tw-w-full tw-flex tw-place-content-center tw-p-2 tw-mx-2"
                            >
                                <span>Upgrade to Pro</span>
                                <CrownFilled />
                            </a>
                        </div>

                    </div>
                </section>

            
            </Modal>

        </div>
    )

}

export default Premium