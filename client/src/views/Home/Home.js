import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar/Navbar.vue'
import Itemlist from '@/components/Itemlist/Itemlist.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Navbar,
    Itemlist
  },
  created() {
    this.$store.dispatch("getFurnitures","")
  },

}