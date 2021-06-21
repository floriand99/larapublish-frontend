<template>
    <div>
        <div class="flex justify-center w-full mt-4">
            <div class="w-11/12 md:w-96 bg-white rounded-lg shadow-lg">
                <div
                    class="text-2xl text-white p-6 md:p-8 font-semibold bg-purple-500 rounded-t-lg"
                >
                    Account Registration
                </div>
                <div class="p-6 md:p-8 space-y-6">
                    <div>
                    <input
                        type="text"
                        placeholder="Enter name"
                        class="rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-purple-500 bg-gray-100 p-3 w-full"
                        v-model="name"
                    />
                    <div class="text-red-500">{{errors.name}}</div>
                    </div>
                    <div>
                    <input
                        type="text"
                        placeholder="Enter email"
                        class="rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-purple-500 bg-gray-100 p-3 w-full"
                        v-model="email"
                    />
                    <div class="text-red-500">{{errors.email}}</div>
                </div>
                <div>
                    <input
                        v-on:keyup.enter="login()"
                        type="password"
                        placeholder="Enter password"
                        class="rounded-md focus:ring-4 focus:ring-opacity-50 focus:ring-purple-500 bg-gray-100 p-3 w-full"
                        v-model="password"
                    />
                    <div class="text-red-500">{{errors.password}}</div>
                </div>
                    <button
                        class="font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 w-full p-3 rounded-lg"
                        @click="register()"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {UserService} from '@/services/api.service'
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            name: '',
            password: '',
            errors: {
                name: '',
                email: '',
                password: '',
            }
        }
    },
    methods:{
        async register(){
            try{
                await UserService.register({
                    email: this.email,
                    name: this.name,
                    password: this.password
                })
                this.$store.dispatch('displayAlert',{
                    message: 'You\'ve registered successfully! Please login now!'
                })
                this.$router.push('/login')
            }catch(err){
                if(err.response.data.errors){
                    this.errors.name = err.response.data.errors?.name?.[0]
                    this.errors.email = err.response.data.errors?.email?.[0]
                    this.errors.password = err.response.data.errors?.password?.[0]   
                }
            }
        }
    },
};
</script>

<style></style>
