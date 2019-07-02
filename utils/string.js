/**
 * 
 * Check if is a Javascript File
 * @param {string} str
 */
const hasJavascriptExtension = str => {
    return /((([a-zA-Z]+\.)+['js']{2}))$/.test(str)
}

/**
 * 
 * Alphanumeric but never only Numeric
 * @param {string} str
 * 
 */
const isValidComponentName = str => {
    return /^(?!\d*$)[a-z\d]*$/i.test(str)
}

module.exports = {
    hasJavascriptExtension,
    isValidComponentName
}