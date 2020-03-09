const Errors = require('../lib/errors');

/**
 * 
 * Check if is a Javascript File
 * @param {string} str
 */
const hasJavascriptExtension = str => {
    return /((([a-zA-Z]+\.)+['js']{2}))$/.test(str);
};

/**
 * 
 * Alphanumeric but never only Numeric
 * @param {string} str
 * 
 */
const isValidComponentName = str => {
    return /^(?!\d*$)[a-z\d]*$/i.test(str);
};

/**
 * transform to kebab-case
 * @param {string} str
 */
const toKebabCase = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase();

/**
 * transform to snake_case
 * @param {string} str
 */
const toSnakeCase = str => str.replace(/([a-z])([A-Z])/g, '$1_$2').replace(/[\s_-]+/g, '_').toLowerCase();

/**
 * transform to UpperCamelCase
 * @BUG HealthInsuranceModal => HealthinsuranceModal
 * @param {string} str
 */
const toUpperCamelCase = str => capitalize(str.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase().replace('-', '').replace('_', '')));

/**
 * transform to lowerCamelCase
 * @param {string} str
 */
const toLowerCamelCase = str => str.replace(/([-_][a-z])/ig, $1 => $1.toUpperCase().replace('-', '').replace('_', ''));

/**
 * capitalize string
 * @param {string} str
 */
const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * By default, the file will be UpperCamelCase style
 * 
 * @param {string} type
 * @param {string} name
 * 
 * @throws {INVALID_CASE_NAME_FOR_FILE}
 */
const treatNameOf = (type, name, nameCase) => {
    if (typeof name !== 'string') return '';

    // File names can't use kebab-case
    if (type === 'File' && nameCase === 'kebab-case') throw Errors.INVALID_CASE_NAME_FOR_FILE();

    switch (nameCase) {

        case 'UpperCamelCase': return toUpperCamelCase(name);
        case 'lowerCamelCase': return toLowerCamelCase(name);
        case 'kebab-case': return toKebabCase(name);
        case 'snake_case': return toSnakeCase(name);
        default: return toUpperCamelCase(name);

    }

};

module.exports = {
    hasJavascriptExtension,
    isValidComponentName,
    toKebabCase,
    toSnakeCase,
    toUpperCamelCase,
    toLowerCamelCase,
    treatNameOf,
};