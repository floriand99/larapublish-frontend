<template>
    <div class="grid grid-cols-2 gap-4">
        <button
            class="flex items-center justify-center py-2 px-4 text-gray-500 rounded hover:bg-gray-200"
            :class="
                filter === ''
                    ? 'shadow-inner bg-gray-200 font-medium'
                    : 'bg-gray-100'
            "
            :disabled="articlesLength === 0"
            @click="$store.dispatch('changeArticleFilter', '')"
        >
            Newest
        </button>
        <button
            class="flex items-center justify-center py-2 px-4 text-gray-500 rounded hover:bg-gray-200"
            :class="
                filter === 'popular'
                    ? 'shadow-inner bg-gray-200 font-medium'
                    : 'bg-gray-100'
            "
            :disabled="articlesLength === 0"
            @click="$store.dispatch('changeArticleFilter', 'popular')"
        >
            Popular
        </button>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "FilterArticles",
    computed: {
        ...mapState({
            articlesLength: (state) => state.articles.data?.length,
            filter: (state) => state.articles.filter,
        }),
    },
    created(){
        // setTimeout(() =>{
        //     console.log(this.loadingStatus)
        // }, 1000)
    }
};
</script>
