import VueCookies from "vue-cookies";

export function songTool(length){
    if(length===1){
        return VueCookies.get("locale")==="en" ? "Song" : "Пісня"
    }
    if(length>1 && length<5){
        return VueCookies.get("locale")==="en" ? "Songs" : "Пісні"
    }
    return VueCookies.get("locale")==="en" ? "Songs" : "Пісень"
}