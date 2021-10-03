import Mock from '../mock'
import shortId from 'shortid'

const EcommerceDB = {
    productList: [
        {
            id: '323sa680b32497dsfdsgga21rt47',
            imgUrl: '/assets/images/products/speaker-1.jpg',
            price: 324.0,
            totalUnit: 100,
            title: 'Bass Speaker Venue 8 - 8 - Intel Atom - 16GB - Black',
            category: 'audio',
            brand: 'Microlab',
            rating: 1,
            freeShipping: false,
            description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
        },
       
    ],

    category: [
        {
            title: 'audio',
            product: 321,
        },
        
    ],

    brand: [
        {
            title: 'Microlab',
            product: 32,
        },
      
    ],

    rating: [
       
        {
            rate: 1,
            product: 64,
        },
    ],

    cart: [
        {
            uid: 'PPFDrVGsojfZoDxeYLMdIAWxSzd2',
            list: [
              
                {
                    productId: '333sa680bdf4976dfgga21rt4',
                    amount: 1,
                },
            ],
        },
    ],

    userList: [
        
        {
            id: '7863a6802ez0e277a0f98534',
            name: 'John Doe',
            avatar: '/assets/images/face-1.jpg',
        },
    ],
}

const getDetailedCartList = (uid) => {
    let cartList = EcommerceDB.cart[0].list
    return cartList.map((product) => ({
        amount: product.amount,
        ...EcommerceDB.productList.find(
            (item) => item.id === product.productId
        ),
    }))
}

Mock.onGet('/api/ecommerce/get-product-list').reply((config) => {
    const response = EcommerceDB.productList
    return [200, response]
})

Mock.onGet('/api/ecommerce/get-category-list').reply((config) => {
    const response = EcommerceDB.category
    return [200, response]
})

Mock.onGet('/api/ecommerce/get-rating-list').reply((config) => {
    const response = EcommerceDB.rating
    return [200, response]
})

Mock.onGet('/api/ecommerce/get-brand-list').reply((config) => {
    const response = EcommerceDB.brand
    return [200, response]
})

Mock.onGet('/api/ecommerce/get-cart-list').reply((config) => {
    let uid = config.data
    let response = []

    if (uid) {
        response = getDetailedCartList(uid)
    }

    return [200, response]
})

Mock.onPost('/api/ecommerce/add-to-cart').reply((config) => {
    let { uid, productId } = JSON.parse(config.data)

    let cartList = EcommerceDB.cart.map((userCart) => {
        // if (userCart.uid === uid) {
        let product = userCart.list.find(
            (product) => product.productId === productId
        )
        if (product) {
            return {
                ...userCart,
                list: userCart.list.map((product) => {
                    if (product.productId === productId) {
                        return {
                            ...product,
                            amount: product.amount + 1,
                        }
                    } else return product
                }),
            }
        } else {
            userCart.list.push({
                productId,
                amount: 1,
            })
            return userCart
        }
        // } else return userCart;
    })

    EcommerceDB.cart = cartList

    const response = getDetailedCartList(uid)

    return [200, response]
})

Mock.onPost('/api/ecommerce/delete-from-cart').reply((config) => {
    let { uid, productId } = JSON.parse(config.data)

    let cartList = EcommerceDB.cart.map((userCart) => {
        // if (userCart.uid === uid) {
        return {
            ...userCart,
            list: userCart.list.filter(
                (product) => product.productId !== productId
            ),
        }
        // } else return userCart;
    })

    EcommerceDB.cart = cartList

    const response = getDetailedCartList(uid)

    return [200, response]
})

Mock.onPost('/api/ecommerce/update-cart-amount').reply((config) => {
    let { uid, productId, amount } = JSON.parse(config.data)

    let cartList = EcommerceDB.cart.map((userCart) => {
        // if (userCart.uid === uid) {
        return {
            ...userCart,
            list: userCart.list.map((product) => {
                if (product.productId === productId) {
                    console.log('found')
                    product.amount = amount
                }
                return product
            }),
        }
        // } else return userCart;
    })

    EcommerceDB.cart = cartList

    const response = getDetailedCartList(uid)

    return [200, response]
})
