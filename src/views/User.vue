<template>
    <Main>
        <div v-if="user" class="flex flex-col items-center space-y-4 my-10">
            <svg v-if="!user.image" class="w-36 h-36 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>
            <img v-else class="rounded-full w-36 h-36 object-cover" :src="`https://calm-forest-02990.herokuapp.com/${user.image}`" />
            <h1 class="text-xl font-semibold text-purple-500">{{user.name}}</h1>
            <p class="w-full md:w-6/12 text-gray-600 md:text-center">{{user.bio}}</p>
            <router-link 
                to="/user/edit"
                v-if="$store.state.user.id === user.id"
                class="px-4 py-2 bg-purple-100 text-purple-600 rounded text-xs">Edit Profile</router-link>
        </div>
        <articles-list></articles-list>
    </Main>
</template>
<script>
    import ArticlesList from '@/components/ArticlesList'
    import Main from '@/views/Main'
    import {UserService} from '@/services/api.service'

export default{
    data(){
        return{
            user: null,
            articles: []
        }
    },
    components:{
        ArticlesList,
        Main
    },
    created(){
        this.getUser()
        this.getUserArticles()
    },
    methods:{
        async getUser(){
        let res = await UserService.get(this.$route.params.id)
        this.user = res.data
        },
        getUserArticles(){
            this.$store.dispatch('getArticles', '/users/' + this.$route.params.id 
                + '/articles?page=1')
        }
    }
}   
</script>