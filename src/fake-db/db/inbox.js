import Mock from '../mock'
import shortid from 'shortid'

const inboxDB = {
    messages: [
        
    ],
}

Mock.onGet('/api/inbox/all').reply((config) => {
    return [200, inboxDB.messages]
})

Mock.onGet('/api/inbox').reply((config) => {
    const id = config.data
    const response = inboxDB.messages.find((message) => message.id === id)
    return [200, response]
})

Mock.onPost('/api/inbox/delete').reply((config) => {
    let message = JSON.parse(config.data)
    let index = { i: 0 }
    inboxDB.messages.forEach((element) => {
        if (element.id === message.id) {
            return [200, inboxDB.messages.splice(index.i, 1)]
        }
        index.i++
    })
    return [200, inboxDB.messages]
})

Mock.onPost('/api/inbox/update').reply((config) => {
    let message = JSON.parse(config.data)
    let index = { i: 0 }
    inboxDB.messages.forEach((element) => {
        if (element.id === message.id) {
            inboxDB.messages[index.i] = message
            return [200, inboxDB.messages]
        }
        index.i++
    })
    return [200, inboxDB.messages]
})

Mock.onPost('/api/inbox/add').reply((config) => {
    let message = JSON.parse(config.data)
    inboxDB.messages.push(message)
    return [200, inboxDB.messages]
})
