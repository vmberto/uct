const CREATE = {
    cmd: 'create',
    options: [],
    args: [
        { title: '--no-spec', action: files => files[files.findIndex(f => f.title === 'Tests')] = null },
        { title: '--no-style', action: files => files[files.findIndex(f => f.title === 'Styles')] = null  },
        { title: '--functional', action: files => files[files.findIndex(f => f.title === 'Component')].template = '@TODO set functional component template here' },
    ]
};

const INIT = {
    cmd: 'init',
    args: []
};

const HELP = {
    cmd: 'help',
    args: []
};


module.exports = {
    CREATE,
    INIT,
    HELP,
};
