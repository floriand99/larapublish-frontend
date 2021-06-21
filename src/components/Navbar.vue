<template>
    <div class="sticky top-0 z-50 shadow-md">
        <div class="bg-white flex justify-center items-center">
            <div class="w-11/12 lg:w-10/12 flex justify-between items-center">
                <router-link
                    to="/"
                    class="text-xl font-semibold text-purple-500 h-full"
                >
                    LaraPublish
                </router-link>
                <div class="flex font-medium items-center space-x-4">
                    <button @click="$store.dispatch('toggleNavbar')">
                        <svg
                            class="lg:hidden my-4"
                            width="24"
                            height="24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                        >
                            <path
                                d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                                fill="#1040e2"
                            />
                            <path
                                d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z"
                            />
                        </svg>
                    </button>
                    <div
                        class="text-gray-500 lg:flex items-center space-x-6 hidden"
                    >
                        <router-link
                            to="/"
                            class="my-auto border-b-2 border-white py-6"
                            :class="
                                $route.path == '/' ? 'border-purple-500' : null
                            "
                            >Home</router-link
                        >
                        <router-link
                            to="/publish"
                            class="my-auto border-b-2 border-white py-6"
                            exact-path
                            :class="
                                $route.path == '/publish'
                                    ? 'border-purple-500'
                                    : null
                            "
                            >Publish</router-link
                        >
                        <router-link
                            to="/login"
                            v-if="!$store.state.isAuthenticated"
                            class="my-auto border-b-2 border-white py-6"
                            :class="
                                $route.path == '/login'
                                    ? 'border-purple-500'
                                    : null
                            "
                            >Login</router-link
                        >
                        <button
                            @click="logout()"
                            v-else
                            class="my-auto border-b-2 border-white py-6"
                            >Logout</button>
                        <router-link
                            v-if="$store.state.isAuthenticated"
                            :to="'/users/sds/' + $store.state.user.id"
                            class="my-auto border-b-2 border-white py-6"
                            exact-path
                            ><img
                                v-if="$store.state.user.image"
                                class="w-6 h-6 rounded-full"
                                :src="getProfile()"
                        />
                         <svg v-else class="w-6 h-6 fill-current text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-3.123 0-5.914-1.441-7.749-3.69.259-.588.783-.995 1.867-1.246 2.244-.518 4.459-.981 3.393-2.945-3.155-5.82-.899-9.119 2.489-9.119 3.322 0 5.634 3.177 2.489 9.119-1.035 1.952 1.1 2.416 3.393 2.945 1.082.25 1.61.655 1.871 1.241-1.836 2.253-4.628 3.695-7.753 3.695z"/></svg>
                    </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-if="$store.state.navigation.isOpen"
            class="mobile-nav bg-white lg:hidden"
        >
            <div class="w-11/12 flex flex-col mx-auto">
                <router-link to="/" class="py-3 border-b border-gray-100"
                    >Home</router-link
                >
                <router-link to="/publish" class="py-3 border-b border-gray-100"
                    >Publish</router-link
                >
                <router-link
                    to="/login"
                    v-if="!$store.state.isAuthenticated"
                    class="py-3 border-b border-gray-100"
                    >Login</router-link
                >
                <button
                    @click="logout()"
                    v-else
                    class="py-3 border-b border-gray-100"
                    >Logout</button
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        getProfile() {
            return (
                process.env.VUE_APP_API_URL.replace("api", "") +
                this.$store.state.user.image
            );
        },
        logout(){
            localStorage.removeItem('token')
            this.$store.dispatch('logout').then(() => this.$router.push('/'))
        }
    },
};
</script>
