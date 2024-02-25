const TelegramApi = require('node-telegram-bot-api');
const token = '6847077836:AAGO-ZeJNTBD5zD_SZbVWFll3WSy6AYFn_4';

const bot = new TelegramApi(token, {polling: true});
let check = false;
let start = () => {
    let saveRandomNum = "";

    bot.setMyCommands([
        {command: "/start", description: "вернуться в начало"},
        {command: "/game", description: "начать игру"},
    ])

    bot.on('message', async msg => {
        const chatId = msg.chat.id;
        const text = msg.text;
        let msgId = msg.message_id + 2;

        if(text === '/start') {
            await bot.sendSticker(chatId, "https://media.stickerswiki.app/meoww_meoww/898938.512.webp");
            await bot.sendMessage(chatId, "привет! я телеграм бот которого пишет - Юра");
            return  bot.sendMessage(chatId, "на данный момент у меня есть лишь одна игра, выбери ее в пункте меню, либо нажми на надпись '/game'");
        }
    })

    bot.on('message', async g => {
        const chatId = g.chat.id;
        const text = g.text;
        let msgId = g.message_id + 2;
        if(text === '/game') {
            saveRandomNum = ""; // перед начлом функции затираю что бы не было наложения
            let numbers = randomNumber();

            for(let i = 0; i < numbers.length; i++) {
                saveRandomNum = saveRandomNum + numbers[i];
            }
            console.log("s2 " + saveRandomNum);
            // console.log("num " + sNumbers);
            const gameOptions = {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{text: 'Готов', callback_data: 'Начать игру'}],
                    ]
                })
            }
            await bot.sendMessage(chatId, "правила игры - сейчас бот пришелет тебе сообщение с 4 цифрами и удалит через секунду. Ты должен их запомнить и написать. Если ты готов нажми 'Готов'", gameOptions);
            await bot.on("callback_query", async msg => {
                const data = msg.data
                if(data == "Начать игру") {
                   // await game(g, chatId, msgId, saveRandomNum); игра ломается
                }
            })
                    await game(g, chatId, msgId, saveRandomNum);
        }
        console.log(g);
        function randomNumber() {
            let arr = [];
            let max = 9;
            let min = 0;
            for(let i = 0; i < 4; i++) {
                arr[i] = Math.floor(Math.random() * (max - min));
            }
            return arr;
        }
        async function game (g, chatId, msgId, saveRandomNum){
            await bot.sendMessage(chatId, `${saveRandomNum}`);
            await bot.sendMessage(chatId, "введи цифры");

            return setTimeout(() => {
                bot.deleteMessage(chatId, msgId)
            }, 1000)

        }
        console.log("randomNum " + saveRandomNum);
        console.log("ввод", text);

        await gameOver(text, chatId);

    })

   async function gameOver(text, chatId) {
        if(saveRandomNum == text) {
            await bot.sendMessage(chatId, "верно");
            return bot.sendMessage(chatId, "хочешь еще раз? нажми '/game'");
        }else {
            console.log("зашел");
            await bot.sendMessage(chatId, "не верно");

        }
    }

// bot.on('callback_query', async msg => {
    //     // let numbers = randomNumber();
    //
    //     // const data = msg.text
    //     const chatId = msg.message.chat.id
    //     bot.on('message', async msg => {
    //         console.log("dsd")
    //
    //         const data = msg.text
    //
    //         if(data == 1) {
    //             await bot.sendMessage(chatId, "верно");
    //         }else {
    //             await bot.sendMessage(chatId, "не верно");
    //         }
    //         console.log("t " + data)
    //
    //     })
    //
    //
    //     console.log("n " + saveN)
    //     // console.log("t " + data)
    // })
}

start()

// const TelegramApi = require('node-telegram-bot-api');
// const token = '6847077836:AAGO-ZeJNTBD5zD_SZbVWFll3WSy6AYFn_4';
//
// const bot = new TelegramApi(token, {polling: true});
// let start = () => {
//     let saveN = 0;
//     bot.setMyCommands([
//         {command: "/game", description: "начать игру"},
//     ])
//     bot.on('message', async msg => {
//         const chatId = msg.chat.id;
//         const text = msg.text;
//         let msgId = msg.message_id + 2;
//
//         if(text === '/start') {
//             await bot.sendSticker(chatId, "https://media.stickerswiki.app/meoww_meoww/898938.512.webp");
//             await bot.sendMessage(chatId, "привет! я телеграм бот которого пишет - Юра");
//             await bot.sendMessage(chatId, "на данный момент у меня есть лишь одна игра, выбери ее в пункте меню, либо нажми на надпись '/game'");
//         }
//         if(text === '/game') {
//             let numbers = randomNumber();
//             saveN = numbers;
//             // let sRandom = "";
//             // for(let i = 0; i < numbers.length; i++) {
//             //     sNumbers = sNumbers + numbers[i];
//             // }
//             // console.log("num " + sNumbers);
//             await bot.sendMessage(chatId, "правила игры - сейчас бот пришелет тебе сообщение с 4 цифрами и удалит через секунду. Ты должен их запомнить и написать")
//             await game(msg, chatId, msgId, numbers);
//         }
//
//         function randomNumber() {
//             let arr = [];
//             let max = 9;
//             let min = 0;
//             for(let i = 0; i < 4; i++) {
//                 arr[i] = Math.floor(Math.random() * (max - min));
//             }
//             return arr;
//         }
//         async function game (msg, chatId, msgId, numbers){
//             // let numbers = randomNumber();
//             await bot.sendMessage(chatId, `${numbers}`);
//             await bot.sendMessage(chatId, "введи цифры");
//             setTimeout(() => {
//                 bot.deleteMessage(chatId, msgId)
//             }, 1000)
//
//         }
//         console.log("ввод", text);
//         console.log("num " + saveN);
//         if(saveN == text) {
//             await bot.sendMessage(chatId, "верно");
//         }else {
//             await bot.sendMessage(chatId, "не верно");
//         }
//     })
