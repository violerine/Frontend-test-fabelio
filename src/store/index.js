import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import sortInt from '../helpers/sortInt'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products:[],
    furnitureStyles:[],
    search:{
      name:"",
      style:[],
      delivery:[]
    }
  },
  mutations: {
    setProducts(state, data){
      state.products = data
    },
    setFurnitureStyles(state, data){
      state.furnitureStyles = data
    },
    setSearch(state,data){
      state.search[data] = data
    }
  },
  actions: {
    getFurnitures({state, commit}, payload){
      let temp = []
      axios.get('http://www.mocky.io/v2/5c9105cb330000112b649af8')
      .then(response => {
        let productData = response.data.products
        if(payload){
          let sortDeliverytime = payload.delivery.sort(sortInt)
          for(var i=0; i<productData.length; i++){
            const intersectionStyle = payload.style.length == 0 ? response.data.furniture_styles :productData[i].furniture_style.filter(el => payload.style.includes(el))
            let deliveryTime = Number(productData[i].delivery_time)
            let productNameCheck = payload.name == "" ? true : productData[i].name.toLowerCase().includes(payload.name)
            function deliveryTimeCheck(sortDt, dt){
              if(sortDt == undefined){
                return true
              }
              else if(sortDt == 31){
                return dt > sortDt
              }else {
                return dt < sortDt
              }
            }
            let dtc = deliveryTimeCheck(sortDeliverytime[0], deliveryTime)
            if(productNameCheck && intersectionStyle.length !== 0 && dtc){
              temp.push(productData[i])
            }
          }
          commit("setProducts", temp)
        }else{
          commit("setProducts", response.data.products)
          commit("setFurnitureStyles", response.data.furniture_styles)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    },
  },
  modules: {
  }
})
