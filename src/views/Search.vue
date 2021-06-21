<template>
  <Main
  :title="'Showing results for: ' + $route.params.query"
  >
    <div class="space-y-8">
    <div class="lg:flex justify-between my-8">
      <search-bar></search-bar>
      <filter-articles v-if="$store.state.articles.data.length > 0"></filter-articles>
    </div>
    <articles-list></articles-list>
    </div>
  </Main>
</template>

<script>
// @ is an alias to /src
import ArticlesList from "@/components/ArticlesList.vue";
import SearchBar from "@/components/SearchBar.vue";
import FilterArticles from "@/components/FilterArticles.vue";
// import Loader from "@/components/Loader.vue";
import Main from "./Main.vue";
import {mapState} from 'vuex'

export default {
  name: "Home",
  computed:{
    ...mapState({
      articles: state => state.articles.data,
      loading: state => state.articles.loading,
      nextPage: state => state.articles.nextPage,
      })
  },
  components: {
    ArticlesList,
    Main,
    SearchBar,
    FilterArticles,
    // Loader,
  },
  created() {
    this.getArticles()
  },
  watch:{
    '$route.path': function(){
        this.getArticles()
    }
  },
  methods:{
    getArticles(){
        this.$store.dispatch('getArticles', `/articles/search/${this.$route.params.query}?page=1`)
    }
  }
};
</script>
<!-- 
<template>
<Main 
  :title="`Showing results for: ${$route.params.query}`" 
  >
  <search-bar></search-bar>
  <div class="flex flex-wrap justify-center space-y-10">
    <articles-list :data="articles"></articles-list>  
  </div>
</Main>
</template>

<script>
// @ is an alias to /src
import ArticlesList from '@/components/ArticlesList.vue'
import Main from './Main.vue'
import SearchBar from '@/components/SearchBar.vue'

export default {
  name: 'Home',
  data: function(){
    return{
        articles: [],
        orderBy: ''
    }
  },
  components:{
    ArticlesList,
    Main,
    SearchBar
  },
  created(){
    fetch(`${process.env.VUE_APP_API_URL}/articles/search/${this.$route.params.query}?token=${localStorage.getItem('token')}`)
    .then(res => res.json())
    .then(res => {
        this.articles = res.data
    })
  }
}
</script>
 -->