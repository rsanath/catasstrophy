const parseString = require('react-native-xml2js').parseString;

/**
 * Xml string to Json
 * @param {string} xml
 * @returns {object}
 */
export function toJson(xml) {
    let json = {};
    parseString(xml, function (err, result) {
        json = result
    });
    return json;
}

/**
 *  Converts
 *  {"response":{"data":[{"images":[{"image":[{"url":["http://25.media.tumblr.com/tumblr_m3lbucuuAL1qze0hyo1_400.jpg"],"id":["a47"],"source_url":["http://thecatapi.com/?id=a47"]}]}]}]}}
 *  into simple json object without array
 * @param {object} json
 * @returns {object}
 */
export function simplify(json) {
    json = json.response.data[0].images[0].image;
    return json.map(x => ({
        id: x.id[0],
        source_url: x.source_url[0],
        url: x.url[0]
    }))
}

export function title(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}