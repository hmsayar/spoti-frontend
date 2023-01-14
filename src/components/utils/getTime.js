export default function getTime(){
    let date = new Date()
    if(date.getHours()>5 && date.getHours()<12){
        return "Good Morning"
    }
    if(date.getHours()>11 && date.getHours()<18){
        return "Good Afternoon"
    }
    if(date.getHours()>17 || date.getHours()<6){
        return "Good Evening"
    }


}
