/**
 * Created by rafael on 07/04/18.
 */
const {TelegramClient} = require('messaging-api-telegram');
const configService = require('./configService');

const parameters = configService.getParameters();
const client = TelegramClient.connect(parameters.token);

/*
 * Sends message through Telegram API
 * @message - String
 * @chatId - Integer
 * @disableNotification - bool
 */
const sendMessage = (message, chatId, disableNotification = true) => {
    client.sendMessage(chatId, message, {
        disable_web_page_preview: true,
        disable_notification: disableNotification,
    });
};

module.exports = { sendMessage };


