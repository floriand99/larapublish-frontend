<template>
    <Main>
    <div class="mx-auto lg:w-7/12 my-10">
        <div class="flex justify-between items-center">
        <h1
            class="font-serif font-semibold rounded-md text-4xl w-full my-4"
        >{{title}}</h1>
        <div v-if="$store.state.user.id === author.id" class="relative">
                    <button class="h-6 w-6 hover:bg-gray-200 rounded-full" @click="showDropdown = !showDropdown">
                        <svg class="fill-current text-gray-700 w-4 h-4 mx-auto my-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z"/></svg>
                    </button>
                    <div v-if="showDropdown" class="flex flex-col items-start absolute w-48 bg-white right-0 shadow rounded mt-1">
                        <router-link :to="`/article/${$route.params.id}/edit`" class="px-3 py-2 border-b w-full text-left hover:bg-gray-100 rounded-t transition">Edit</router-link>
                        <button @click="deleteArticle()" class="px-3 py-2 w-full text-left hover:bg-gray-100 rounded-b transition">Delete</button>
                    </div>
                    </div>
    </div>
        <div class="flex mb-4 items-center">
            <svg v-if="!author.image" class="w-10 h-10 mr-3 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>
            <img
            v-else
            class="w-10 h-10 rounded-full object-cover mr-3" :src="`https://calm-forest-02990.herokuapp.com/${author.image}`">
            <div>
                <div class="text-purple-600 font-medium text-sm">
                    {{author.name}}
                </div>
                <div class="text-gray-500 text-xs">
                    March 31 · 11 min read
                </div>
            </div>
            </div>
        <img v-if="image" class="w-full" :src="`https://calm-forest-02990.herokuapp.com/${image}`" />
        <vue-editor
            v-model="content"
            :editor-toolbar="customToolbar"
            :editorOptions="editorOptions"
            :disabled="true"
            class="my-6"
        ></vue-editor>
        <div class="w-full flex justify-center">
        <button 
            @click="like()"
            class="transform hover:scale-125 transition my-8 px-10 py-4 bg-purple-100 text-white font-medium rounded text-purple-500 flex text-lg hover:bg-purple-200 transition transition-500">
            <svg v-if="liked" fill="#7C3AED" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
            <svg v-else fill="#7C3AED" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg>
            <span class="ml-2">{{likes}} likes</span>
        </button>
        </div>
    </div>
    </Main>
</template>

<script>
import { VueEditor } from "vue2-editor";
import Main from "./Main";
import {ArticleService, LikeService} from '@/services/api.service'

export default {
    name: 'PublishArticle',
    components: {
        VueEditor,
        Main
    },
    data() {
        return {
            title: '',
            image: '',
            content: "",
            likes: 0,
            liked: false,
            author: {},
            showDropdown: false,
            customToolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"], // toggled buttons
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["clean"],
            ],
            editorOptions: {
                modules: {
                  toolbar: false,
                },
              }
        }
    },
    created(){
        this.getArticle()
    },
    methods:{
        async getArticle(){
            let res = await ArticleService.get(this.$route.params.id)
            this.title = res.data.title
            this.content = res.data.content
            this.image = res.data.image
            this.author = {
                id: res.data.user.id,
                name: res.data.user.name,
                image: res.data.user.image,
            }
            this.likes = res.data.likes_count
            this.liked = res.data.liked
        },
        async like(){
            let res = await LikeService.store(this.$route.params.id)
            this.likes = res.data.likes_count
            this.liked = res.data.liked
        },
        async deleteArticle(){
            await ArticleService.delete(this.$route.params.id)
            this.$store.dispatch('displayAlert', {
                message: 'Article deleted successfully!',
                color: 'green'
            })
        }
    }
};
</script>

<style>
</style>
