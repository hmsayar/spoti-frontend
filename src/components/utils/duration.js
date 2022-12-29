export default function getDuration(ms){
    let minutes = Math.floor(ms/60000).toString()
    let seconds = Math.floor((ms%60000)/1000).toString()
    if(seconds<10){
       seconds = "0" + seconds
    }
    return `${minutes}:${seconds}`
}

getDuration(243297)