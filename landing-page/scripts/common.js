/**
 * Author: Paul
 * License by https://foxcraft.tech
 */


class Toast{

    constructor(toast){
        
        this.timeout = null

        this.toastContainer = document.querySelector(toast)

        this.toastBody = this.toastContainer.querySelector("#toast-body")
        this.closeBtn = this.toastContainer.querySelector("button")
        
        
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)

        this.closeBtn.addEventListener("click", this.hide)
    }

    show(message, timeout=5000){

        if (this.timeout){
            clearTimeout(this.timeout)
        }
        this.toastBody.innerText = message
        this.toastContainer.classList.remove("tw-hidden")

        this.timeout = setTimeout(this.hide, timeout)
    }

    hide(){
        this.toastContainer.classList.add("tw-hidden")
        clearTimeout(this.timeout)
    }

}

/**
 * commonly used functions
 */
let defaultToast = new Toast("#toast")

window.addEventListener("load", () => {
    defaultToast = new Toast("#toast")
})


/**
 * 
 * @param {HTMLElement} alert 
 */
function hideAlertError(alert) {
    alert.classList.add("tw-hidden")
    alert.innerText = ""
}

/**
 * @param {HTMLElement} alert 
 * @param {string} text 
 */
function alertError(alert, text = "") {
    alert.innerText = text
    alert.classList.remove("tw-hidden")
    alert.classList.remove("!tw-hidden")
}

/**
 * 
 * @param {HTMLElement | null} toast 
 * @param {string} text 
 * @param {"normal" | "danger"} type 
 * @param {int} timeout in ms 
 */
function toastAlert(toast, text = "", type = "normal", timeout=5000) {

    if (toast == null) {
        toast = defaultToast
    }

    if (type === "danger") {
        toast.toastContainer.classList.add("tw-bg-red-500",)
        toast.toastContainer.classList.remove("tw-bg-blue-400",)
    } else {
        toast.toastContainer.classList.remove("tw-bg-red-500",)
        toast.toastContainer.classList.add("tw-bg-blue-400")
    }

    toast.show(text, timeout)
}

/**
 * 
 * @param {HTMLElement} toast 
 * @param {string} text 
 */
function resetToast(toast) {

    const toastBody = Array.from(toast.getElementsByClassName('toast-body'))
    toastBody.at(-1).innerText = ""

}
