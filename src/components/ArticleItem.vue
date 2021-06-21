<template>
    <div class="lg:flex shadow-lg rounded-lg bg-white">
        <img
            v-if="image"
            :src="`https://calm-forest-02990.herokuapp.com/${image}`"
            class="lg:w-1/3 h-52 lg:h-72 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg object-cover w-full"
        />
        <div v-else class="lg:w-1/3 h-52 lg:h-72 rounded-t-lg lg:rounded-t-none lg:rounded-l-lg object-cover w-full gradient">
        </div>
        <div
            class="p-4 lg:py-6 lg:px-8 rounded-lg lg:w-2/3 w-full"
        >
            <div class="space-y-3  lg:space-y-4">
                    <div class="flex justify-between">
                    <router-link
                        :to="`/article/${getSlug()}/${id}`"
                        class="text-xl font-semibold"
                    >
                        {{ title }}
                    </router-link>
                </div>
                    <div class="text-gray-500 text-sm font-medium">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim Ut enim ad minim Ut enim ad minim
                    </div>
                <div class="flex items-center">
                    <svg v-if="!author.image" class="w-8 h-8 mr-3 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>
                    <img
                        v-else
                        class="w-8 h-8 rounded-full object-cover mr-3"
                        :src="`https://calm-forest-02990.herokuapp.com/${author.image}`"
                    />
                    <div>
                        <router-link 
                            :to="getAuthorSlug()"
                            class="text-purple-600 font-medium text-sm">
                            {{ author.name }}
                        </router-link>
                        <div class="text-gray-500 text-xs">
                            {{new Date(createdAt).toLocaleDateString()}} · {{readingTime}} minutes read
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap">
                    <router-link
                        v-for="tag in tags"
                        :key="tag.id"
                        class="mr-1 mb-1 lg:mb-0 px-1 py-1 bg-purple-100 text-purple-600 text-xs rounded"
                        :to="`/tags/${tag.content}/${tag.id}`"
                        >{{tag.content}}</router-link
                    >
                </div>
                <div>
                    <div class="text-xs text-gray-500 flex items-center">
                        <svg
                            class="fill-current text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"
                            /></svg
                        ><span class="ml-1">{{ likes }} likes</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ArticleItem",
    props: {
        title: String,
        author: Object,
        image: String,
        id: Number,
        likes: String,
        tags: Array,
        createdAt: Date,
        readingTime: Number
    },
    methods: {
        getSlug() {
            return this.title.replaceAll(" ", "-").toLowerCase();
        },
        getAuthorSlug(){
            return `/users/${this.author.name.toLowerCase().replace(' ', '-')}/${this.author.id}`
        }
    },
};
</script>

<style scoped></style>
