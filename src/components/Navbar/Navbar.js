export default { 
    // created() {
    //     console.log(this.furnitureStyle)
    //     this.$store.dispatch("getFurnitures","")
    // },
    computed: {
        furnitureStyle(){
            return this.$store.state.furnitureStyles
        }
    },
    data() {
        return {
            filterStyle :[],
            deliveryTime:["< 1 week", "< 2 weeks", "< 1 month", "> 1 month"],
            filterDelivery:[],
            searchInput:"",

        }
    },
    methods: {
        checkStyle(style){
            if(this.filterStyle.includes(style)){
                this.filterStyle.splice(this.filterStyle.indexOf(style),1)
            }else{
                this.filterStyle.push(style)
            }
            let search = this.$store.state.search
            search["style"] = this.filterStyle
            this.$store.dispatch("getFurnitures",search)
        },
        checkDelivery(time){
            if(this.filterDelivery.includes(time)){
                this.filterDelivery.splice(this.filterDelivery.indexOf(time),1)
            }else{
                this.filterDelivery.push(time)
            }
            let search = this.$store.state.search
            search["delivery"] = this.filterDelivery
            console.log(this.filterDelivery)
            this.$store.dispatch("getFurnitures", search)
        },
        search(){
            let search = this.$store.state.search
            search["name"] = this.searchInput
            this.$store.dispatch("getFurnitures",search)
        }
    },
}