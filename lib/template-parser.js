const Errors = require('./errors');

/**
 * Template Parser Engine
 * 
 * @template to be parsed
 * @values to be binded
 */
const templateParser = (template, values) => {
    const totalBinders = template.split('<$').length - 1;
    const binders = [];

    for (let i = 0; i < totalBinders; i++) {
        binders.push(template.split('<$')[i + 1].split('$>')[0].replace(/\s/g, ''));
    }

    template = template.split('$>').join('');
    template = template.split('<$').join('');
    binders.forEach(binder => {
        if (!values[binder]) throw Errors.UNDEFINED_BINDER();
        template = template.replace(binder, values[binder]);
    });

    return template;

}

module.exports = templateParser;