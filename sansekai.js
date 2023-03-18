const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { Configuration, OpenAIApi } = require("openai")
//let setting = require('./accesser.json')
const BOT_NAME = process.env.BOT_NAME ?? "John Sathya Seelan";
const Friends = process.env.Friends ?? "Judson" + "Pranesh";
/*fetch('./accesser.json')
  .then(response => response.json())
  .then(data => {
    // access the my_var property
	keyopenai = data.keyopenai;
	autoAI = data.autoAI;
    console.log(data.my_var);
  })
  .catch(error => {
    // handle any errors
    console.error(error);
  });*/
const keyopenai = process.env.keyopenai;
const autoAI = process.env.autoAI;
//let keyopenai = require('process.env.keyopenai')
//let autoAI = require('process.env.autoAI')
/*autoAI = data.autoAI;
if (typeof fetch !== 'undefined') {
  // use fetch to make the request
  fetch('./accesser.json')
    .then(response => response.json())
    .then(data => {
      // do something with the data
	keyopenai = data.keyopenai;
	autoAI = data.autoAI;
    console.log(data.my_var);
    })
    .catch(error => {
      console.error(error);
    });
} else {
  // use XMLHttpRequest to make the request
  const xhr = new XMLHttpRequest();
  xhr.open('GET', './accesser.json');
  xhr.onload = function() {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      // do something with the data
	keyopenai = data.keyopenai;
	autoAI = data.autoAI;
    console.log(data.my_var);
    } else {
      console.error('Error loading data');
    }
  };
  xhr.onerror = function() {
    console.error('Error loading data');
  };
  xhr.send();
}*/



module.exports = sansekai = async (client, m, chatUpdate, store) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
        const isCmd2 = body.startsWith(prefix)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        const botNumber = await client.decodeJid(client.user.id)
        const itsMe = m.sender == botNumber ? true : false
        let text = q = args.join(" ")
        const arg = budy.trim().substring(budy.indexOf(' ') + 1)
        const arg1 = arg.trim().substring(arg.indexOf(' ') + 1)

        console.log(m);

        const from = m.chat
        const reply = m.reply
        const sender = m.sender
        const mek = chatUpdate.messages[0]

        const color = (text, color) => {
            return !color ? chalk.green(text) : chalk.keyword(color)(text)
        }

        // Group
        const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch(e => { }) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''

        // Push Message To Console
        let argsLog = (budy.length > 30) ? `${q.substring(0, 30)}...` : budy

        if (autoAI) {
            // Push Message To Console && Auto Read
            if (argsLog && !m.isGroup) {
                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
            } else if (argsLog && m.isGroup) {
                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
            }
        } else if (!autoAI) {
            if (isCmd2 && !m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`))
            } else if (isCmd2 && m.isGroup) {
                console.log(chalk.black(chalk.bgWhite('[ LOGS ]')), color(argsLog, 'turquoise'), chalk.magenta('From'), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace('@s.whatsapp.net', '')} ]`), chalk.blueBright('IN'), chalk.green(groupName))
            }
        }
		

        if (autoAI && !m.isGroup) {


            if (budy) {
                try {
                    if (keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return reply('Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys')
                    const configuration = new Configuration({
                        apiKey: keyopenai,
                    });
                    const openai = new OpenAIApi(configuration);
			

					

                    let prompt_template =
                        "I am artificial intelligence " +
                        BOT_NAME +
                        " developed by a John Sathya Seelan.\n\nHuman: Hi. How are you?\n" +
                        BOT_NAME +
                        ": I'm well. How can I help you?\nHuman: " +
                        budy +
                        "\n" +
                        BOT_NAME +
                        ": "; 

                    const response = await openai.createCompletion({
                        model: "text-davinci-003",
                        prompt: prompt_template,
                        temperature: 0.9,
                        max_tokens: 3000,
                        top_p: 1,
                        frequency_penalty: 0.0,
                        presence_penalty: 0.6,
                    });
                    m.reply(`${response.data.choices[0].text}\n\n`)
                } catch (err) {
                    console.log(err)
                    m.reply('I am getting API Update right now. Please hold on anc check back in a while.')
                }
            }
        }
        if (!autoAI && !m.isGroup) {
            if (isCmd2) {
                switch (command) {
                    case 'ai':
                        try {
                            if (keyopenai === 'ISI_APIKEY_OPENAI_DISINI') return reply('Api key has not been filled in\n\nPlease fill in the apikey first in the key.json file\n\nThe apikey can be created in website: https://beta.openai.com/account/api-keys')
                            if (!text) return reply(`Chat dengan AI.\n\nContoh:\n${prefix}${command} Apa itu resesi`)
                            const configuration = new Configuration({
                                apiKey: keyopenai,
                            });
                            const openai = new OpenAIApi(configuration);

                            const response = await openai.createCompletion({
                                model: "text-davinci-003",
                                prompt: text,
                                temperature: 0.3,
                                max_tokens: 3000,
                                top_p: 1.0,
                                frequency_penalty: 0.0,
                                presence_penalty: 0.0,
                            });
                            m.reply(`${response.data.choices[0].text}\n\n`)
                        } catch (err) {
                            console.log(err)
                            m.reply('error')
                        }
                        break
                    default: {

                        if (isCmd2 && budy.toLowerCase() != undefined) {
                            if (m.chat.endsWith('broadcast')) return
                            if (m.isBaileys) return
                            if (!(budy.toLowerCase())) return
                            if (argsLog || isCmd2 && !m.isGroup) {
                                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                                console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            } else if (argsLog || isCmd2 && m.isGroup) {
                                // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
                                console.log(chalk.black(chalk.bgRed('[ ERROR ]')), color('command', 'turquoise'), color(argsLog, 'turquoise'), color('tidak tersedia', 'turquoise'))
                            }
                        }
                    }
                }
            }
        }

    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})
