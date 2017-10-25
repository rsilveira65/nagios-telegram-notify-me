/*
* nagios-telegram-notify-me
* @author: Rafael Silveira <rsilveiracc@gmail.com>
*/
const {TelegramClient} = require('messaging-api-telegram');
const commandLineArgs = require('command-line-args');
YAML = require('yamljs');
emoji = require('node-emoji');

parameters = getParameters()

const client = TelegramClient.connect(parameters.token);

const options = handleInputs();

let emojiMessage = '';

switch(options.state) {
    case 'UP':
        emojiMessage = emoji.get('up');
        break;
    case 'DOWN':
        emojiMessage = emoji.get('arrow_down');
        break;
    case 'UNREACHABLE':
        emojiMessage = emoji.get('information_desk_person');
        break;
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

let message = `${emojiMessage} ${options.hostname} ${options.output}`;

Object.keys(parameters.chat_ids).forEach(function(key) {
    chatObject = parameters.chat_ids[key];
    if (options.verbose) {
        let verboseMessage = `Send message to ${chatObject.name}`
        console.log(verboseMessage);
        console.log(message);
    }

    sendMessage(message, chatObject.id, chatObject.disable_notification);   
});

/*
* Parses yaml configuration file.
*/
function getParameters() {
    return YAML.load('config/config.yml');
}

/*
* Sends message through Telegram API
* @message - String
* @chatId - Integer
* @disableNotification - bool
*/
function sendMessage(message, chatId, disableNotification = true) {
    client.sendMessage(chatId, message, {
        disable_web_page_preview: true,
        disable_notification: disableNotification,
    });
}

/*
* Handles input arguments.
*/
function handleInputs() {
    const optionDefinitions = [
        { name: 'verbose', alias: 'v', type: Boolean },
        { name: 'messenger', alias: 'm', type: String },
        { name: 'hostname', alias: 'n', type: String },
        { name: 'state', alias: 's', type: String },
        { name: 'servicedesc', alias: 'd', type: String },
        { name: 'output', alias: 'o', type: String }
    ]

    return commandLineArgs(optionDefinitions)
}