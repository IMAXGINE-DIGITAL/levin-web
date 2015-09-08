const WIDTH = 1600;
const HEIGHT = 900;

export function elementRect(width, height, left, top, vp) {
    var w = vp && vp[0] || WIDTH;
    var h = vp && vp[1] || HEIGHT
    return `
        width:${width/w*100}%;
        height:${height/h*100}%;
        left:${left/w*100}%;
        top:${top/h*100}%;
    `
}