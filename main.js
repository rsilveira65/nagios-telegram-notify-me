const {TelegramClient} = require('messaging-api-telegram');
const commandLineArgs = require('command-line-args');
YAML = require('yamljs');
emoji = require('node-emoji');

parameters = getParameters()
const client = TelegramClient.connect(parameters.token);

const options = handleInputs();

let emojiMessage = '';

if (options.object_type == 'host') {
    switch(options.hoststate) {
        case 'UP':
            emojiMessage = emoji.get('up');
            break;
        case 'DOWN':
            emojiMessage = emoji.get('arrow_down');
            break;
        case 'UNREACHABLE':
            emojiMessage = emoji.get('information_desk_person');
            break;
        default:
            emojiMessage = emoji.get('coffee');
    }
} 

if (options.object_type == 'service') {
    switch(options.servicestate) {
        case 'OK':
            emojiMessage = emoji.get('ok');
            break;
        case 'WARNING':
            emojiMessage = emoji.get('warning');
            break;
        case 'CRITICAL':
            emojiMessage = emoji.get('sos');
            break;
        case 'UNKNOWN':
            emojiMessage = emoji.get('information_desk_person');
            break;
        default:
            emojiMessage = emoji.get('coffee');
    }
}

let message = `${emojiMessage} ${options.hostname} ${options.output}`;

Object.keys(parameters.chat_ids).forEach(function(key) {
    chatObject = parameters.chat_ids[key];
    if (options.verbose) {
        let verboseMessage = `Send message to ${chatObject.name}`
        console.log(verboseMessage);
        console.log(message);
    }

    sendMessage(message, chatObject.id);   
});

function getParameters() {
    return YAML.load('config/config.yml');
}

function sendMessage(message, chat_id) {
    client.sendMessage(chat_id, message, {
        disable_web_page_preview: true,
        disable_notification: true,
    });
}

function handleInputs() {
    const optionDefinitions = [
        { name: 'verbose', alias: 'v', type: Boolean },
        { name: 'messenger', alias: 'm', type: String },
        { name: 'object_type', alias: 't', type: String },
        { name: 'hotstate', alias: 'h', type: String },
        { name: 'hostname', alias: 'n', type: String },
        { name: 'servicestate', alias: 's', type: String },
        { name: 'servicedesc', alias: 'd', type: String },
        { name: 'output', alias: 'o', type: String }
    ]

    return commandLineArgs(optionDefinitions)
}