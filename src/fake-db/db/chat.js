import Mock from '../mock'
import shortId from 'shortid'
// import * as _ from "lodash";

const ChatDB = {
    user: [
       
    ],
}

Mock.onGet('/api/chat').reply((config) => {
    const id = config.data
    const chats = ChatDB.chatCollection.find(
        (collection) => collection.id === id
    ).chats
    const response = chats.map((chat) => {
        let temp = ChatDB.contacts.find((user) => user.id === chat.contactId)
        return { ...chat, ...temp }
    })
    return [200, response]
})

Mock.onGet('/api/chat/chat-room').reply((config) => {
    const { currentUser, contactId } = JSON.parse(config.data)

    const chatUser = ChatDB.user.find((user) => user.id === currentUser)
    const chatRoom = chatUser.chatInfo.find(
        (chat) => chat.contactId === contactId
    )

    if (chatRoom) {
        const chats = ChatDB.chatCollection.find(
            (collection) => collection.id === chatRoom.chatId
        ).chats
        const messageList = chats.map((chat) => {
            let temp = ChatDB.contacts.find(
                (user) => user.id === chat.contactId
            )
            return { ...chat, ...temp }
        })
        const response = {
            chatId: chatRoom.chatId,
            messageList,
            recentListUpdated: false,
        }
        return [200, response]
    } else {
        let chatId = shortId.generate()
        ChatDB.user.forEach((user) => {
            if (currentUser === user.id) {
                user.chatInfo.push({
                    chatId,
                    contactId,
                    lastChatTime: Date.now(),
                    unread: 0,
                })
            }
        })
        ChatDB.chatCollection.push({
            id: chatId,
            chats: [],
        })

        const response = {
            chatId,
            messageList: [],
            recentListUpdated: true,
        }

        return [200, response]
    }
})

Mock.onGet('/api/chat/contacts/recent').reply((config) => {
    let temp = { contact: '' }
    const id = config.data
    const contacts = ChatDB.user.find((user) => user.id === id).chatInfo
    const response = contacts.map((contact) => {
        temp.contact = ChatDB.contacts.find(
            (user) => user.id === contact.contactId
        )
        return { ...temp.contact, ...contact }
    })
    return [200, response]
})

Mock.onGet('/api/chat/contacts/all').reply((config) => {
    const id = config.data
    const response = ChatDB.contacts.filter((contact) => contact.id !== id)
    return [200, response]
})

Mock.onGet('/api/chat/contacts').reply((config) => {
    const id = config.data
    const response = ChatDB.contacts.find((contact) => contact.id === id)
    return [200, response]
})

Mock.onPost('/api/chat/add').reply((config) => {
    let chatDetails = JSON.parse(config.data)
    let { chatId } = chatDetails
    ChatDB.chatCollection.forEach((chatRoom) => {
        if (chatId === chatRoom.id) {
            delete chatDetails.chatId
            chatRoom.chats.push({ ...chatDetails })
        }
    })
    let chats = ChatDB.chatCollection.find((chatRoom) => chatRoom.id === chatId)
        .chats

    let response = chats.map((chat) => {
        let temp = ChatDB.contacts.find((user) => user.id === chat.contactId)
        return { ...chat, ...temp }
    })
    return [200, response]
})
