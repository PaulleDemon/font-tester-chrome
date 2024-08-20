
(function() {

    async function fetchDB(){

        try{
            const response = await fetch(`../db/google-fonts.json`)
    
            return await response.json()
        }catch(e){
            showAlert("Failed to fetch DB, please reload or try again later")
            return 
        }
    }

    function showAlert(message="", timeout=3000){

        const toastAlertEle = document.createElement('div')
        
        const toastAlertStyle = {
            backgroundColor: "#000",
            color: "#fff",
            zIndex: 10000,
            position: "fixed",
            top: "20px",
            left: "50%",
            padding: "5px",
            transform: "translateX(-50%)",
            display: "flex",
            alignItems: "center",
            maxWidth: "450px",
            minWidth: "200px",
            height: "40px",
            borderRadius: "5px",
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        } 

        toastAlertEle.innerText = message
        Object.assign(toastAlertEle.style, toastAlertStyle)

        document.body.appendChild(toastAlertEle)
    
        setTimeout(() => {
            toastAlertEle.remove()
        }, timeout)
    }

    class FontSelectorContainer {
        constructor() {

            this.widgetContainer = document.createElement("div")
            this.widgetContainer.id = 'font-selector'
    
            const widgetStyle = {
                position: "fixed",
                bottom: "10px",
                right: "10px",
                width: "300px",
                height: "600px",
                padding: "10px",
                backgroundColor: "#ffffff",
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                zIndex: '10000',
                fontFamily: 'Arial, sans-serif'
            }
    
            Object.assign(this.widgetContainer.style, widgetStyle)

            const headerElement = document.createElement('div')
            const headerStyle = {
                display: "flex",
                justifyContent: "space-between",
                padding: "2px"
            }

            Object.assign(headerElement.style, headerStyle)

            const closeBtn = document.createElement('button')
            closeBtn.innerHTML = "&times;"
            closeBtn.addEventListener("click", () => {
                this.widgetContainer.remove()
                chrome.runtime.sendMessage({ action: 'widgetClosed' })
            })

            const closeBtnStyle = {
                cursor: "pointer",
                fontSize: "18px",
                background: "none",
                border: "none",
                color: "#000"
            }

            Object.assign(closeBtn.style, closeBtnStyle)


            // Create the movable handle
            const movableHandle = document.createElement('div')
            // movableHandle.innerText = ":::"
            movableHandle.classList.add("bi", "bi-grid-3x2-gap")
            const movableHandleStyle = {
                width: "30px",
                height: "30px",
                padding: "5px",
                backgroundColor: "#ededed",
                cursor: "move",
                borderRadius: "5px",
                fontSize: "20px",
                color: "#828282",
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }
            Object.assign(movableHandle.style, movableHandleStyle)

            // Attach drag functionality to the handle
            this.attachDragEvents(movableHandle)

            headerElement.appendChild(movableHandle)
            headerElement.appendChild(closeBtn)

            this.widgetContainer.appendChild(headerElement)

            document.body.appendChild(this.widgetContainer)
            this.initWidget()
        }

        
        initWidget(){


            const selectorContainer = document.createElement('div')
            selectorContainer.innerHTML  = `

                <div style="margin-top: 10px;">
                    <p style="margin: 0;">#E2E4E8  RGB(226, 228, 232)</p>
                </div>
                <div style="margin-top: 20px; background: linear-gradient(45deg, #ff7e5f, #feb47b); padding: 5px 0; text-align: center; border-radius: 5px;">
                    <span style="color: white; font-size: 14px;">☆ Rate the Extension ☆</span>
                </div>
            `

            this.widgetContainer.appendChild(selectorContainer)

        }

        attachDragEvents(handle) {
            let offsetX = 0;
            let offsetY = 0;
            let isDragging = false;
    
            handle.addEventListener('mousedown', (e) => {
                isDragging = true;
                offsetX = e.clientX - this.widgetContainer.getBoundingClientRect().left;
                offsetY = e.clientY - this.widgetContainer.getBoundingClientRect().top;
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
    
            const onMouseMove = (e) => {
                if (!isDragging) return;
    
                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
    
                this.widgetContainer.style.left = `${x}px`;
                this.widgetContainer.style.top = `${y}px`;
                this.widgetContainer.style.bottom = 'auto'; // Prevent snapping back to original position
                this.widgetContainer.style.right = 'auto';  // Prevent snapping back to original position
            };
    
            const onMouseUp = () => {
                isDragging = false;
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
        }


        getContainer() {
            return this.widgetContainer
        }
    }

    function loadExternals(){

        const linkIcons = document.createElement('link')
        linkIcons.type = "text/css"
        linkIcons.href = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/font/bootstrap-icons.min.css"
        linkIcons.rel = "stylesheet"
        linkIcons.setAttribute("rel", "stylesheet") 
        linkIcons.setAttribute("crossorigin", "anonymous") 
        linkIcons.setAttribute("integrity", "sha512-dPXYcDub/aeb08c63jRq/k6GaKccl256JQy/AnOq7CAnEZ9FzSL9wSbcZkMp4R26vBsMLFYH4kQ67/bbV8XaCQ==") 
        
        document.querySelector("head").appendChild(linkIcons)

    }

    loadExternals()

    let existingWidget = document.querySelector('#font-selector')
    
    if (!existingWidget) {
        new FontSelectorContainer().getContainer()
    } else {
        console.log('Widget already exists.')
    }
})()
