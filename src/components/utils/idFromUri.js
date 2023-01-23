export default function uriFromId(uri) {
    var phrase = uri;
    var myRegexp = /spotify:artist:(.*)/;
    var match = myRegexp.exec(phrase);
    return match[1]
}
