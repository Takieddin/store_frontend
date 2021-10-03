import Mock from '../mock'

const invoiceDB = {
    invoices: [
       
    ],
}

Mock.onGet('/api/invoices/all').reply((config) => {
    return [200, invoiceDB.invoices]
})

Mock.onGet('/api/invoices').reply((config) => {
    const id = config.data
    const response = invoiceDB.invoices.find((invoice) => invoice.id === id)
    return [200, response]
})

Mock.onPost('/api/invoices/delete').reply((config) => {
    let invoice = JSON.parse(config.data)
    let index = { i: 0 }
    invoiceDB.invoices.forEach((element) => {
        if (element.id === invoice.id) {
            return [200, invoiceDB.invoices.splice(index.i, 1)]
        }
        index.i++
    })
    return [200, invoiceDB.invoices]
})

Mock.onPost('/api/invoices/update').reply((config) => {
    let invoice = JSON.parse(config.data)
    let index = { i: 0 }
    invoiceDB.invoices.forEach((element) => {
        if (element.id === invoice.id) {
            invoiceDB.invoices[index.i] = invoice
            return [200, invoiceDB.invoices]
        }
        index.i++
    })
    return [200, invoiceDB.invoices]
})

Mock.onPost('/api/invoices/add').reply((config) => {
    let invoice = JSON.parse(config.data)
    invoiceDB.invoices.push(invoice)
    return [200, invoiceDB.invoices]
})
