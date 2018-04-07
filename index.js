/*
* nagios-telegram-notify-me
* @author: Rafael Silveira <rsilveiracc@gmail.com>
*/

//Node Modules
const emoji = require('node-emoji');

//Local Modules
const telegramService = require('./services/telegramService');
const configService = require('./services/configService');
const commandLineService = require('./services/commandLineService');

const options = commandLineService.handleInputs();
const parameters = configService.getParameters();

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

Object.keys(parameters.chat_ids).map(key => {
    const chatObject = parameters.chat_ids[key];
    if (options.verbose) {
        const verboseMessage = `Send message to ${chatObject.name}`;
        console.log(verboseMessage);
        console.log(message);
    }

    telegramService.sendMessage(message, chatObject.id, chatObject.disable_notification);
});