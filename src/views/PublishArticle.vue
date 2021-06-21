<template>
    <Main
    title="Publish article"
    >
        <div class="mx-auto lg:w-8/12 space-y-8 my-10">
            <div>
                <input
                    type="text"
                    class="font-serif font-semibold px-6 py-4 shadow-md rounded-md text-4xl w-full"
                    placeholder="Enter title"
                    v-model="title"
                />
                <div>
                    <div class="text-gray-500 text-xs flex items-center mt-1">
                        <span class="mr-1">Title must be between 5 and 150 characters. Character count: {{titleValidation.count}}</span>
                        <svg class="fill-current text-gray-400" v-if="!titleValidation.passed" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                        <svg class="fill-current text-green-500" v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
                    </div>
                </div>
            </div>
            <div>
                <upload-image 
                    text="Choose an article image"
                    v-on:setImage="updateImage" 
                    ref="uploadRef" />
            </div>
            <div>
                <vue-editor
                    v-model="content"
                    class="bg-white"
                    placeholder="Write your article content here..."
                    ref="vueEditor"
                ></vue-editor>
                <div class="text-gray-500 text-xs flex items-center mt-1">
                        <span class="mr-1">Enter between 100 and 12000 characters. Character count: {{contentCharCount}}</span>
                        <svg class="fill-current text-gray-400" v-if="!contentValidation.passed" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                        <svg class="fill-current text-green-500" v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
                    </div>
            </div>
            <div>
            <div class="bg-white shadow flex items-center rounded">
                <div class="tags space-x-2 text-xs mx-2">
                    <span
                        v-for="(tag, i) in tags"
                        :key="i"
                        class="p-1 bg-purple-100 text-purple-700 rounded"
                        >{{ tag }}</span
                    >
                </div>
                <div class="flex-grow">
                <input
                    type="text"
                    name=""
                    class="py-4 w-full rounded"
                    placeholder="Write your tag and hit enter"
                    @keydown.enter="addTag"
                    @keydown.delete="removeLastTag"
                />
                </div>
            </div>
           <div>
                    <div class="text-gray-500 text-xs flex items-center mt-1">
                        <span class="mr-1">Enter up to five tags. At least one is required.</span>
                        <svg class="fill-current text-gray-400" v-if="!tagsValidation.passed" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
                        <svg class="fill-current text-green-500" v-else xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/></svg>
                    </div>
                </div>
        </div>
            <button
                @click="publish()"
                class="w-full lg:w-auto px-6 py-3 bg-green-500 text-white font-medium rounded"
            >
                Publish article
            </button>
        </div>
    </Main>
</template>

<script>
// import {ArticleService} from '@/services/api.service'
import storeUpdateArticleMixin from '@/mixins/storeUpdateArticleMixin'

export default {
    name: "PublishArticle",
    mixins: [storeUpdateArticleMixin]
};
</script>

<style>
</style>
