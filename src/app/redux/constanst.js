//export  const url =`http://192.168.1.7:8000`//`https://ahmedhanoute.herokuapp.com`// 
require('dotenv').config();

export const url = process.env.NODE_ENV === 'development' ?`http://${process.env.REACT_APP_IP.trim()}:8000`:`http://${window.REACT_APP_IP.trim()}:8000`
console.log('url')
console.log(url)