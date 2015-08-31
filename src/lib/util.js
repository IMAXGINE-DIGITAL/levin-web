const WIDTH = 1600;
const HEIGHT = 900;

export function elementRect(width, height, left, top) {
    return `
        width:${width/WIDTH*100}%;
        height:${height/HEIGHT*100}%;
        left:${left/WIDTH*100}%;
        top:${top/HEIGHT*100}%;
    `
}