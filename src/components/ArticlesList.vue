<template>
  <div class="flex flex-col flex-wrap justify-center space-y-10">
    <div class="flex flex-col space-y-10"  v-if="$store.state.articles.data.length > 0">
    <div v-for="article in $store.state.articles.data" :key="article.id">
        <article-item 
          :id="article.id"
          :title="article.title" 
          :author="article.user" 
          :image="article.image"
          :likes="article.likes_count"
          :tags="article.tags"
          :reading-time="article.reading_time"
          :created-at="article.created_at"
        ></article-item>
    </div>
    </div>
    <div v-else-if="$store.state.articles.data.length == 0 && !loading">
      <strong>No articles to display</strong>
    </div>
    <loader v-if="loading"></loader>
    <div class="flex">
    <button v-if="nextPage && !loading" @click="$store.dispatch('getArticles')" class="h-12 w-full lg:w-32 bg-gray-500 mx-auto rounded text-white">Load more</button>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import ArticleItem from './ArticleItem.vue'
import Loader from './Loader.vue'
import {mapState} from 'vuex'

export default {
  name: 'ArticlesList',
  components:{
    ArticleItem,
    Loader
  },
  computed:{
    ...mapState({
      loading: state => state.articles.loading,
      nextPage: state => state.articles.nextPage,
    })
  },
  created(){
  },
}
</script>
