<template>
    <transition name="fade"
        v-if="$store.state.alert.message"
    >
        <div class="flex text-sm font-medium text-white w-11/12 lg:w-4/12 p-3 fixed bottom-4 lg:right-4 rounded shadow-md alert"
        :class="`bg-${$store.state.alert.color}-500`"
        >
        <div
            class="w-full"
        >
            {{$store.state.alert.message}}
        </div>
        <button @click="closeAlert()">
        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"/></svg>
        </button>
    </div>
    </transition>
</template>

<script>
export default {
    props: {
        message: String,
    },
    methods:{
        closeAlert(){
            this.$store.commit('closeAlert')
        }
    }
};
</script>
