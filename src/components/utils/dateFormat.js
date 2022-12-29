export default function dateFormatter(d){
    let date = new Date(d)
    let month = date.toLocaleString('en-GB', { month: 'short' })
    return (`${month} ${date.getUTCDay()}, ${date.getUTCFullYear()}`)
}