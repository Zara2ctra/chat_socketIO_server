const Message = require("../models/models.js");

module.exports = (io, socket) => {

    const getMessages = async () => {
        const messages = await Message.findAll();
        let data = messages.map((i) => {
            return i.dataValues
        })
        io.in(socket.sharedRoom).emit('messages', data);
    }

    const addMessage = async (message) => {
        let currentTagList = message.tagList.join(" ")
        await Message.create({messageText: message.messageText, tagList: currentTagList});
        await getMessages();
    }

    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
}