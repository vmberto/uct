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

/**
 * transform to kebab-case
 * @param {string} str
 */
const toKebabCase = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();

/**
 * transform to snake_case
 * @param {string} str
 */
const toSnakeCase = str => str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s_]+/g, '_').toLowerCase();

/**
 * transform to UpperCamelCase
 * @param {string} str
 */
const toUpperCamelCase = str => str.replace(/^([A-Z])|\s(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()).split('').charAt(0).toUpperCase().join('');

/**
 * transform to lowerCamelCase
 * @param {string} str
 */
const toLowerCamelCase = str => str.replace(/^([A-Z])|\s(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());


module.exports = {
    hasJavascriptExtension,
    isValidComponentName,
    toKebabCase,
    toSnakeCase,
    toUpperCamelCase,
    toLowerCamelCase,
}