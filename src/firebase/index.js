import * as firebase from 'firebase'
import { setPortfolios, setSelectedPortfolio } from '../actions'

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
  console.log('888 Adding New Portfolio to Account', value);
  return new Promise((resolve, reject) => {
  firebase.database().ref(`${key}/portfolios`)
    .push(value, error => error ? reject(error) : resolve())
  })
}


export const portfolioListner = (key) => {
  console.log('999 FIREBASE - portfolioListner ');
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

export const lastPortfolioSelectedListner = (key) => {
  console.log('999 FIREBASE - selectedPortfolioListner');
  dbRef.ref(`${key}/selectedportfolio`).on('value', snap => {
    setSelectedPortfolio(snap.val())
  })
}

// Editing Information

export const editPortfolioCoin = (accountKey, portfolioKey, serverKey, updatedObject) => {
  console.log('TRYING TO EDIT MOFO...', accountKey, portfolioKey, serverKey, updatedObject)
  return new Promise((resolve, reject) => {
  firebase.database().ref(`${accountKey}/portfolios/${portfolioKey}/coins`).child(serverKey).update(updatedObject, error => error ? reject(error) : resolve())
  })
}

export const setFBSelectedPortfolio = (accountKey, portfolioKey) => {
  console.log('999 - Setting The NEW SELECTED PORTFOLIO!!', portfolioKey);
  return new Promise((resolve, reject) => {
  firebase.database().ref(`${accountKey}/selectedportfolio`).set(portfolioKey, error => error ? reject(error) : resolve())
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
