

export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export function rgbToHex(rgb) {
    const result = rgb.match(/\d+/g)

    return result
        ? `#${((1 << 24) + (+result[0] << 16) + (+result[1] << 8) + +result[2])
            .toString(16)
            .slice(1)
            .toUpperCase()}`
        : ''
}


/**
 * Returns if the window selection is inside a element
 * @param {HTMLElement} el 
 * @returns 
 */
export function elementContainsSelection(el) {
    var sel = window.getSelection();
    if (sel.rangeCount > 0) {
        for (var i = 0; i < sel.rangeCount; ++i) {
            if (!el.contains(sel.getRangeAt(i).commonAncestorContainer)) {
                return false;
            }
        }
        return true;
    }
    return false;
}



export const checkSelectionInShadowDOM = (shadowRoot) => {
    const selection = shadowRoot.getSelection()

    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    const startContainer = range.startContainer
    const endContainer = range.endContainer

    // Check if the start or end container is inside the shadow DOM
    if (shadowRoot.contains(startContainer) || shadowRoot.contains(endContainer)) {
        return true
    }

    return false
}


export function isPointOverText(x, y) {
    const element = document.elementFromPoint(x, y)
    if (!element) return false

    const nodes = element.childNodes
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (node.nodeType === Node.TEXT_NODE) {
            const range = document.createRange()
            range.selectNode(node)
            const rects = range.getClientRects()
            for (let j = 0; j < rects.length; j++) {
                const rect = rects[j]
                if (x > rect.left && x < rect.right && y > rect.top && y < rect.bottom) {
                    return true
                }
            }
        }
    }
    return false
}