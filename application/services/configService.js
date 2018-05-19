/**
 * Created by rafael on 07/04/18.
 */
const YAML = require('yamljs');

/*
 * Parses yaml configuration file.
 */
const getParameters = () => YAML.load(__dirname + '/../config/config.yml');

module.exports = {getParameters};
