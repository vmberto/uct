const Errors = require('./errors');

/**
 * Template Parser Engine
 * 
 * @template to be parsed
 * @values to be binded
 */
const templateParser = (template, values) => {

    template = readVariableBinders(template, values);

    template = readLogicalBinders(template, values);

    return template;

}

const readVariableBinders = (template, values) => {
    const totalVariableBinders = template.split('<$').length - 1;
    const variableBinders = [];

    for (let i = 0; i < totalVariableBinders; i++) {
        variableBinders.push(template.split('<$')[i + 1].split('$>')[0].replace(/\s/g, ''));
    }

    template = template.split('$>').join('');
    template = template.split('<$').join('');
    variableBinders.forEach(variableBinder => {
        if (!values[variableBinder]) throw Errors.UNDEFINED_BINDER();
        template = template.replace(variableBinder, values[variableBinder]);
    });

    return template;

}

const readLogicalBinders = (template, values) => {
    const totalLogicalBinders = template.split('<?').length - 1;
    const logicalBinders = [];

    for (let i = 0; i < totalLogicalBinders; i++) {
        logicalBinders.push(template.split('<?')[i + 1].split('?>')[0]);
    }


    template = template.split('?>').join('');
    template = template.split('<?').join('');
    logicalBinders.forEach(logicalBinder => {

        const binder = logicalBinder.split('=?')[0].replace(/\s/g, '');
        if (!Object.keys(values).includes(binder)) throw Errors.UNDEFINED_BINDER();

        if (!values[binder]) {
            template = template.replace(logicalBinder.split('=?')[1], '');
        }

        template = template.split(binder).join('');

    });

    template = template.split('=?').join('');

    return template;
}

module.exports = templateParser;
