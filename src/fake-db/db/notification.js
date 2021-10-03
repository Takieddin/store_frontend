import Mock from '../mock'
import shortId from 'shortid'

const NotificationDB = {
    list: [
        {
            id: shortId.generate(),
            heading: 'Message',
            icon: {
                name: 'chat',
                color: 'primary',
            },
            timestamp: 1570702802573,
            title: 'New message from Ta9i',
            subtitle: 'Hello, kach khlass...',
            path: 'chat',
        },
       
    ],
}

Mock.onGet('/api/notification').reply((config) => {
    const response = NotificationDB.list
    return [200, response]
})

Mock.onPost('/api/notification/add').reply((config) => {
    const response = NotificationDB.list
    return [200, response]
})

Mock.onPost('/api/notification/delete').reply((config) => {
    let { id } = JSON.parse(config.data)
    console.log(config.data)

    const response = NotificationDB.list.filter(
        (notification) => notification.id !== id
    )
    NotificationDB.list = [...response]
    return [200, response]
})

Mock.onPost('/api/notification/delete-all').reply((config) => {
    NotificationDB.list = []
    const response = NotificationDB.list
    return [200, response]
})
