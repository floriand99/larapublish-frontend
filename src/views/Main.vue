<template>
    <div>
        <alert></alert>
        <div class="bg-gray-100">
            <div
                v-if="title"
                class="w-11/12 md:w-10/12 mx-auto text-lg py-4 font-medium text-gray-600"
            >
                {{ title }}
            </div>
        </div>
        <div class="flex justify-center mb-6">
            <div class="w-11/12 md:w-10/12">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import VueFileAgentStyles from "vue-file-agent/dist/vue-file-agent.css";
import Alert from "@/components/Alert";
// import Navbar from '@/components/Navbar';

export default {
    name: "Main",
    data() {
        return {
            query: "",
        };
    },
    mounted() {
        window.scrollTo(0, 0);
    },
    components: {
        Alert,
        // Loader
    },
    props: {
        title: String,
    },
};

/**
<div v-if="displaySearchbar" class="md:flex justify-between my-8">
                    <input
                        type="text"
                        placeholder="Search for any article"
                        class="mb-6 md:mb-0 w-full md:w-1/3 bg-white rounded shadow-md px-4 py-3"
                        v-model="query"
                        v-on:keyup.enter="search()"
                    />
                    <div class="grid grid-cols-3 gap-3">
                        <router-link
                            class="flex items-center justify-center bg-gray-500 py-2 px-3 text-gray-50 rounded hover:bg-gray-200"
                            to="/newest"
                        >
                            <span>Trending</span>
                        </router-link>
                        <button
                            class="bg-gray-100 py-2 px-3 text-gray-500 rounded hover:bg-gray-200"
                        >
                            Newest
                        </button>
                        <router-link
                            to="/popular"
                            class="bg-gray-100 py-2 px-3 text-gray-500 rounded hover:bg-gray-200"
                        >
                            Popular
                        </router-link>
                    </div>
                </div>
                **/
</script>

<style src="../assets/tailwind.css" />