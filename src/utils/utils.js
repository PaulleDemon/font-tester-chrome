

export function randomInt(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


export function rgbToHex(rgb){
    const result = rgb.match(/\d+/g)
    
    return result
        ? `#${((1 << 24) + (+result[0] << 16) + (+result[1] << 8) + +result[2])
              .toString(16)
              .slice(1)
              .toUpperCase()}`
        : ''
}