import {toJson, simplify} from "../helpers/util";

const apiKey = "MzIwNzU3";

/**
 * Returns an array of string which are urls to images of cats
 *
 * The structure of the result is
 * [{id: 'unique_id', source_url: 'url_to_catapi.com', url: 'url of the image'}]
 *
 * @param n
 * @returns {Promise<T | never>}
 */
export function getCats(n = 20) {
    return fetch(`http://thecatapi.com/api/images/get?api_key=${apiKey}&format=xml&results_per_page=${n}`)
        .then(res => res.text())
        .then(data => simplify(toJson(data)))
}