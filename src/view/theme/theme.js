import DefaultTheme from './default-theme'
import BaseValues from './base-values'

function getTheme() {
    return {...DefaultTheme, ...BaseValues}
}

export default getTheme()