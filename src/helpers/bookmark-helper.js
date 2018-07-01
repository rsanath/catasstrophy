/**
 *
 * Info: The structure of the bookmarks object is
 * [ { url: 'url_to_the_image' }, ... ]
 */

import localStorage from './local-storage'
import {removeFromList} from "./util";

const BOOKMARK = 'bookmark';

export async function getBookmarks() {
    const bookmarks = await localStorage.get(BOOKMARK);
    return bookmarks || []
}

export async function setBookmarks(bookmarks) {
    return await localStorage.set(BOOKMARK, bookmarks);
}

export async function bookmarkImage(imageUrl) {
    const bookmarks = await getBookmarks();
    if (bookmarks.find(bookmark => bookmark.url === imageUrl)) return;
    const bookmark = {url: imageUrl};
    bookmarks.push(bookmark);
}

export async function deleteBookmark(imageUrl) {
    let bookmarks = await getBookmarks();
    const bookmark = bookmarks.find(bookmark => bookmark.url === imageUrl);
    if (!bookmark) return;
    bookmarks = removeFromList(bookmarks, bookmark);
    return await setBookmarks(bookmarks);
}