var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
    bot.setPresence({ game: { name: 'Type !!!help' }, status: 'online' })
});
bot.on('message', function (user, userID, channelID, message, evt) {

    if (message.substring(0, 10) == '!!!yesorno') {

    }
    if (message.substring(0, 3) == '!!!') {
        if (message.toLowerCase().substring(3, 10) == 'yesorno') {
            var args = message.toLowerCase().substring(11)
            if (args.substring(args.length - 1) == "?") {
                var randomLength = 0;
                for (var i in args) {
                    randomLength += args.charCodeAt(i);
                }
                if (randomLength % 2 == 0) {
                    bot.sendMessage({
                        to: channelID,
                        message: 'Yes'
                    });
                } else {
                    bot.sendMessage({
                        to: channelID,
                        message: 'No'
                    });
                }
            } else {
                bot.sendMessage({
                    to: channelID,
                    message: "That's not a question"
                });
            }
        } else {
            var args = message.toLowerCase().substring(3)
            switch (args) {
                case "what's your name?":
                    bot.sendMessage({
                        to: channelID,
                        message: ('My name is ' + bot.username)
                    });
                    break;
                case "help":
                    bot.sendMessage({
                        to: channelID,
                        message: ("**| | | NICO_THE_BOT | | |**\n***Created by***\n***| | | NICO_THE_PRO | | |***\n\n- - - - - - - - - - - - - -\n__Start every command with !!!__\n\n**List of all commands:**\n```help | Returns this text\ninvite | Link to invite the bot to your server\nyesorno + question | Returns a random yet reliable answer to any question\nwhat's your name? | Returns the bot's name```\n\nThe commands are NOT case sensitive, at example saying `!!!hELp` will still work!")
                    });
                    break;
                case "invite":
                    bot.sendMessage({
                        to: channelID,
                        message: ('Got to this link to invite me to your server: https://discordapp.com/oauth2/authorize?&client_id=491131716832985088&scope=bot&permissions=8')
                    });
                    break;
            }
        }
    }
});