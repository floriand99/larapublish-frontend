<template>
    <div class="order-last w-full mb-6 md:mb-0 md:w-1/3 bg-white rounded shadow-md items-center p-1">
    <div class="grid grid-cols-11 items-center">
    <input
        type="text"
        placeholder="Search for any article"
        class="col-span-9 p-2"
        v-model="query"
        v-on:keyup.enter="search()"
    />
    <button @click="search()" class="col-span-2 bg-blue-100 h-full rounded flex items-center">
    <svg class="fill-current text-blue-600 h-5 w-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.809 21.646l-6.205-6.205c1.167-1.605 1.857-3.579 1.857-5.711 0-5.365-4.365-9.73-9.731-9.73-5.365 0-9.73 4.365-9.73 9.73 0 5.366 4.365 9.73 9.73 9.73 2.034 0 3.923-.627 5.487-1.698l6.238 6.238 2.354-2.354zm-20.955-11.916c0-3.792 3.085-6.877 6.877-6.877s6.877 3.085 6.877 6.877-3.085 6.877-6.877 6.877c-3.793 0-6.877-3.085-6.877-6.877z"/></svg>
    </button>
    </div>
    </div>
</template>

<script>
    export default{
        name: 'SearchBar',
        data(){
            return{
                query: ''
            }
        },
        methods:{
            search(){
                if(this.query.length > 2){
                    this.$router.push('/search/' + this.query)
                    this.query = ''
                }
            }
        }
    }
</script>