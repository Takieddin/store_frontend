import Mock from '../mock'

const ListDB = {
    list: [
        
    ],
}

Mock.onGet('/api/list/all').reply((config) => {
    const response = ListDB.list
    return [200, response]
})
