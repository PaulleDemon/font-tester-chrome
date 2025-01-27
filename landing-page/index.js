// initialization

const RESPONSIVE_WIDTH = 1024

let headerWhiteBg = false
let isHeaderCollapsed = window.innerWidth < RESPONSIVE_WIDTH
const collapseBtn = document.getElementById("collapse-btn")
const collapseHeaderItems = document.getElementById("collapsed-header-items")



function onHeaderClickOutside(e) {

    if (!collapseHeaderItems.contains(e.target)) {
        toggleHeader()
    }

}


function toggleHeader() {
    if (isHeaderCollapsed) {
        // collapseHeaderItems.classList.remove("max-md:tw-opacity-0")
        collapseHeaderItems.classList.add("opacity-100",)
        collapseHeaderItems.style.width = "60vw"
        collapseBtn.classList.remove("bi-list")
        collapseBtn.classList.add("bi-x", "max-lg:tw-fixed")
        isHeaderCollapsed = false

        setTimeout(() => window.addEventListener("click", onHeaderClickOutside), 1)

    } else {
        collapseHeaderItems.classList.remove("opacity-100")
        collapseHeaderItems.style.width = "0vw"
        collapseBtn.classList.remove("bi-x", "max-lg:tw-fixed")
        collapseBtn.classList.add("bi-list")
        isHeaderCollapsed = true
        window.removeEventListener("click", onHeaderClickOutside)

    }
}

function responsive() {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
        collapseHeaderItems.style.width = ""

    } else {
        isHeaderCollapsed = true
    }
}

window.addEventListener("resize", responsive)


/**
 * Animations
 */

gsap.registerPlugin(ScrollTrigger)


gsap.to(".reveal-up", {
    opacity: 0,
    y: "100%",
})

const slideShowContainer = document.querySelector("#slideshow")

gsap.fromTo(".slide-in", {
    y: "100%"
}, {
    y: "0%",
    duration: 1,
})


const videoBg = document.querySelector("#video-container-bg")
const videoContainer = document.querySelector("#video-container")

function openVideo(){
    videoBg.classList.remove("tw-scale-0", "tw-opacity-0")
    videoBg.classList.add("tw-scale-100", "tw-opacity-100")
    videoContainer.classList.remove("tw-scale-0")
    videoContainer.classList.add("tw-scale-100")

    document.body.classList.add("modal-open")
}

function closeVideo(){
    videoContainer.classList.add("tw-scale-0")
    videoContainer.classList.remove("tw-scale-100")

    setTimeout(() => {
        videoBg.classList.remove("tw-scale-100", "tw-opacity-100")
        videoBg.classList.add("tw-scale-0", "tw-opacity-0")
    }, 400)
   

    document.body.classList.remove("modal-open")

}

const faqAccordion = document.querySelectorAll('.faq-accordion')

faqAccordion.forEach(function (btn) {
    btn.addEventListener('click', function () {
        this.classList.toggle('active')

        // Toggle 'rotate' class to rotate the arrow
        let content = this.nextElementSibling
        
        // content.classList.toggle('!tw-hidden')
        if (content.style.maxHeight === '200px') {
            content.style.maxHeight = '0px'
            content.style.padding = '0px 18px'

        } else {
            content.style.maxHeight = '200px'
            content.style.padding = '20px 18px'
        }
    })
})



// ------------- reveal section animations ---------------

const sections = gsap.utils.toArray("section")

sections.forEach((sec) => {

    const revealUptimeline = gsap.timeline({paused: true, 
                                            scrollTrigger: {
                                                            trigger: sec,
                                                            start: "10% 80%", // top of trigger hits the top of viewport
                                                            end: "20% 90%",
                                                            // markers: true,
                                                            // scrub: 1,
                                                        }})

    revealUptimeline.to(sec.querySelectorAll(".reveal-up"), {
        opacity: 1,
        duration: 0.8,
        y: "0%",
        stagger: 0.2,
    })


})



const reviewContainer = document.querySelector(".review-container")


/**---- fonts animation */
const textElement = document.getElementById('fonts');

// GSAP Timeline
// const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Repeat infinitely with delay between iterations
const fonts = ['bungee-shade-family', 'aboreto-family', 'Courier New', 'Verdana'];

let currentFontIndex = 0;

// function changeFont() {
//     // Animate text out (upward)
//     gsap.to(textElement, {
//       y: '-100%',
//       textOpacity: 0,
//       duration: 0.5,
//       ease: 'power2.out',
//       onComplete: () => {
//         // Update the font and text after it moves out
//         textElement.className = `tw-px-3 tw-bg-[#ffe27a] ${fonts[currentFontIndex]}`
//         // textElement.textContent = 'Your Text Here'

//         // Animate text back in (upward)
//         gsap.fromTo(
//           textElement,
//           { y: '100%', textOpacity: 0 },
//           { y: '0%', textOpacity: 1, duration: 0.5, ease: 'power2.inOut' }
//         )

//         // Update the font index for the next cycle
//         currentFontIndex = (currentFontIndex + 1) % fonts.length
//       },
//     })
// }

//   // Change font every 3 seconds
// setInterval(changeFont, 3000)

document.addEventListener("load", function(){
    console.log("Loaded")
    $('#fonts').textillate({
        selector: "#fonts",
        loop: true, 
        minDisplayTime: 10,
        autoStart: true,
        in: {
            // set the effect name
            effect: 'flipInX',
        
            // set the delay factor applied to each consecutive character
            delayScale: 1.5,
        
            // set the delay between each character
            delay: 50,
        
            // set to true to animate all the characters at the same time
            sync: true,
        
            // randomize the character sequence
            // (note that shuffle doesn't make sense with sync = true)
            shuffle: false,
        
            // reverse the character sequence
            // (note that reverse doesn't make sense with sync = true)
            reverse: false,
        
            // callback that executes once the animation has finished
            callback: function () {

                textElement.className = `tw-px-3 tw-bg-[#ffe27a] ${fonts[currentFontIndex]}`
                currentFontIndex = (currentFontIndex + 1) % fonts.length
                console.log("working")
            }
        },

        callback: function () {

            textElement.className = `tw-px-3 tw-bg-[#ffe27a] ${fonts[currentFontIndex]}`
            currentFontIndex = (currentFontIndex + 1) % fonts.length
            console.log("working")
        }
    
    })
})
    