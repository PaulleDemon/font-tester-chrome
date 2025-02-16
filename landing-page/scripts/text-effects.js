
const toastAlert = document.querySelector("#toast-alert")
let toastAlertTimeout = null

let dbCache = []

const urlParams = new URLSearchParams(window.location.search)

/**
 * Fetches the json db
 * @returns JS object
 */
async function fetchDB(){

    try{
        const response = await fetch(`./db/data.json`)

        return await response.json()
    }catch(e){
        console.error(e)
        showAlert("Failed to fetch DB, please reload or try again later")
        return 
    }
}

fetchDB().then((data) => {
    dbCache = data
    loadEffects(data)

    const searchParam = urlParams.get('search')

    if (searchParam?.length > 0){
        const search = document.querySelector("#search-input")
        search.value = searchParam
        // onSearch()
    }

})
const effectsDataContainer = document.querySelector("#effects-data-container")
/**
 * Adds templates to the page
 */
function loadEffects(data) {
    effectsDataContainer.innerHTML = "";

    data.forEach((x) => {
        let template = `
            <div class="tw-w-[450px] tw-h-[410px] tw-p-2 tw-rounded-md tw-overflow-hidden
                        tw-border-[1px] tw-border-[#656667] tw-bg-[#171717]">

                <div class="template-preview">
                    <p class="codepen" data-height="300" data-default-tab="result" 
                            data-slug-hash="${x.codeLink.split('/').pop()}" 
                            data-pen-title="${x.title}" 
                            data-user="${x.username}" 
                            style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
                        <span>See the Pen 
                        <a href="${x.codeLink}">
                            ${x.title}
                        </a> by ${x.author} (<a href="https://codepen.io/${x.username}">@${x.username}</a>)
                        on <a href="https://codepen.io">CodePen</a>.</span>
                    </p>
                </div>
                <div class="tw-flex tw-flex-col tw-gap-1 tw-p-1 tw-min-h-[50px] tw-h-[100px] tw-w-full tw-place-content-center tw-place-items-center" >
                    
                    <div class="tw-flex tw-justify-between tw-w-full tw-h-full tw-place-content-center tw-place-items-center">
                        <h2 class="tw-text-xl inter-family tw-uppercase">${x.title}</h2>

                        <a href="${x.codeLink}" target="_blank" rel="noopener noreferrer" 
                                                class="tw-rounded-full tw-flex tw-border-white tw-border-[1px] 
                                                        tw-w-[30px] tw-h-[30px] tw-place-content-center
                                                        tw-text-lg"
                                                title="open in codepen">        
                            <i class="bi bi-arrow-up-right"></i>
                        </a>
                    </div>
                    
                    <div class="tw-flex tw-justify-between tw-w-full tw-gap-2">
                        <div class="tw-text-[#444646] tw-place-content-start tw-w-full">by ${x.author}</div>
                        ${x.interactive === true ? ('<div title="This effect is interactive" class="tw-uppercase tw-place-items-center tw-gap-2 tw-flex"> <div class="tw-w-[5px] tw-h-[5px] tw-bg-green-500 tw-rounded-full"></div> interactive</div>') : ''}
                    </div>
                </div>
            </div> 
        `;

        effectsDataContainer.innerHTML += template;
    });

    // Fix: Initialize CodePen embeds
    if (window.__CPEmbed) {
        window.__CPEmbed();
    }
}


