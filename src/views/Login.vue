<template>
    <div>
        <div class="flex justify-center w-full mt-4">
            <div class="w-11/12 md:w-96 bg-white rounded-lg shadow-lg">
                <div
                    class="text-2xl text-white p-6 md:p-8 font-semibold bg-purple-500 rounded-t-lg"
                >
                    Account Login
                </div>
                <div class="p-6 md:p-8 space-y-6">
                    <input
                        type="text"
                        placeholder="Enter email"
                        class="rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-purple-500 bg-gray-100 p-3 w-full"
                        v-model="email"
                    />
                    <input
                        v-on:keyup.enter="login()"
                        type="password"
                        placeholder="Enter password"
                        class="rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-purple-500 bg-gray-100 p-3 w-full"
                        v-model="password"
                    />
                    <div class="text-gray-500">Don't have an account? <router-link class="text-purple-500" to="/register">Register.</router-link></div>
                    <button
                        class="font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 w-full p-3 rounded-lg"
                        @click="login()"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            password: '',
        }
    },
    methods:{
        login(){
            fetch('https://calm-forest-02990.herokuapp.com/api/auth/login', {
                method: 'POST',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                })
            }).then(res => res.json())
            .then(res => {
                localStorage.setItem('token', res.access_token)
                axios.defaults.headers.common["authorization"] = `Bearer ${localStorage.getItem('token')}`;
                console.log(axios.defaults.headers.common["authorization"])
                this.$store.dispatch('login').then(() => this.$router.history.push('/'))
                this.getUser()
            })
        },
        getUser(){
            fetch('https://calm-forest-02990.herokuapp.com/api/auth/me?token=' + localStorage.getItem('token'), {
                method: 'POST'
            })
            .then(res => res.json())
            .then(res => this.$store.dispatch('setUser', res))
        }
    },
};
</script>

<style></style>
