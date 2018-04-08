/**
 * Created by rafael on 07/04/18.
 */
const commandLineArgs = require('command-line-args');
/*
 * Handles input arguments.
 */
const handleInputs = () => {
    const optionDefinitions = [
        { name: 'verbose', alias: 'v', type: Boolean },
        { name: 'messenger', alias: 'm', type: String },
        { name: 'hostname', alias: 'n', type: String },
        { name: 'state', alias: 's', type: String },
        { name: 'servicedesc', alias: 'd', type: String },
        { name: 'output', alias: 'o', type: String }
    ];

    return commandLineArgs(optionDefinitions);
};

module.exports = { handleInputs };