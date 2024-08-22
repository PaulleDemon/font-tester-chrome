// Function to recursively get all nodes within the selection range
//  @depreciated
export function getNodesInRange(range) {
    const nodes = []
    const walker = document.createTreeWalker(
        range.commonAncestorContainer, // Start walking from the common ancestor
        NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, // Show both elements and text nodes
        {
            acceptNode: node => {
                if (range.intersectsNode(node)) {
                    return NodeFilter.FILTER_ACCEPT
                }
                return NodeFilter.FILTER_REJECT
            }
        }
    )

    while (walker.nextNode()) {
        nodes.push(walker.currentNode)
    }

    return nodes
}


function nextNode(node) {
    if (node.hasChildNodes()) {
        return node.firstChild
    } else {
        while (node && !node.nextSibling) {
            node = node.parentNode
        }
        if (!node) {
            return null
        }
        return node.nextSibling
    }
}

export function getRangeSelectedNodes(range) {

    // https://stackoverflow.com/questions/7781963/js-get-array-of-all-selected-nodes-in-contenteditable-div
    let node = range.startContainer
    let endNode = range.endContainer

    // Special case for a range that is contained within a single node
    if (node == endNode) {
        if (node.nodeType === node.TEXT_NODE){
            // if the node is a text node, get the immediate parent
            return [node.parentNode]
        }
        return [node]
    }

    // Iterate nodes until we hit the end container
    let rangeNodes = []
    while (node && node != endNode) {
        rangeNodes.push( node = nextNode(node) )
    }

    // Add partially selected nodes at the start of the range
    node = range.startContainer
    while (node && node != range.commonAncestorContainer) {
        rangeNodes.unshift(node)
        node = node.parentNode
    }

    return rangeNodes
}
