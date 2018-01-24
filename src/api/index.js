import { setLiveData } from '../actions'

export const getLiveData = () => {
 return $.getJSON('https://api.coinmarketcap.com/v1/ticker/?convert=CAD&limit=650')
   .then((data) => {
     let newObject = {}
     data.forEach(function(item){
       let tempObj = {[item.id]: item}
       Object.assign(newObject, tempObj)
     })
     this.props.setLiveData(newObject)
   })
}
