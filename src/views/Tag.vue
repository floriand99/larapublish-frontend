<template>
  <Main
  :title="'Showing articles with tag: ' + $route.params.slug"
  >
    <div class="space-y-8">
    <div class="lg:flex justify-between my-8">
      <search-bar></search-bar>
      <filter-articles></filter-articles>
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
    this.$store.dispatch('getArticles', `/tags/${this.$route.params.id}?page=1`)
  }
};
</script>