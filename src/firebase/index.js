import * as firebase from 'firebase'
import { setPortfolios } from '../actions'

const config = {
  apiKey: "AIzaSyBkA6YfYvSAcAxHXquCj0EsR87FRsZm48c",
  authDomain: "coinrextwo.firebaseapp.com",
  databaseURL: "https://coinrextwo.firebaseio.com",
  projectId: "coinrextwo",
  storageBucket: "coinrextwo.appspot.com",
  messagingSenderId: "1002016770677"
}

export const firebaseApp = firebase.initializeApp(config)
export const dbRef = firebase.database()
export const coinRef = firebase.database().ref('portfolio')

export const addCoinToPortfolio = (accountKey, portfolioKey, value) => {
  return new Promise((resolve, reject) => {
  firebase.database().ref(`${accountKey}/portfolios/${portfolioKey}/coins`)
    .push(value, error => error ? reject(error) : resolve())
  })
}

export const addNewPortfolioToAccount = (key, value) => {
  return new Promise((resolve, reject) => {
  firebase.database().ref(`${key}/portfolios`)
    .push(value, error => error ? reject(error) : resolve())
  })
}


export const portfolioListner = (key) => {
  dbRef.ref(`${key}/portfolios`).on('value', snap => {
    let coinDataArray = []
    snap.forEach(coin => {
      const coinObject = coin.val()
      const serverKey = coin.key
      coinDataArray.push({coinObject, serverKey})
    })
    setPortfolios(coinDataArray)
  })
}


export const editPortfolioCoin = (accountKey, portfolioKey, serverKey, updatedObject) => {
  console.log('TRYING TO EDIT MOFO...', accountKey, portfolioKey, serverKey, updatedObject)
  return new Promise((resolve, reject) => {
  firebase.database().ref(`${accountKey}/portfolios/${portfolioKey}/coins`).child(serverKey).update(updatedObject, error => error ? reject(error) : resolve())
  })
}







/*

export const addCoinToPortfolio = (key, value) => {
  return new Promise((resolve, reject) => {
  firebase.database().ref(`portfolios/${key}`)
    .push(value, error => error ? reject(error) : resolve())
  })
}



*/
