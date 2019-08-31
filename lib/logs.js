exports.defaultLog = () => `Usage: uct <command>\n
where <command> is one of:
    init, create, help`;

exports.createSuccess = fileName => console.log("\x1b[32m", `✓ ${fileName} file successfully created!`)

exports.createFail = fileName => console.log("\x1b[31m", `× ${fileName} file creation failed!`);

exports.error = message => console.error("\x1b[31m", `× ${message}`)