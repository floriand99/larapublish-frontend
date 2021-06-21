<template>
  <div id="app" class="text-gray-700">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
    export default{
        name: 'App',
        components:{
          Navbar
        }
        // created(){
        //     fetch('https://calm-forest-02990.herokuapp.com/api/lol')
        //     .then(res => res.json())
        //     .then(res => console.log(res))
        // }
    }
</script>

<style>
body{
    font-family: Poppins;
    background: #f8f8f8;
    overflow-x: hidden;
}
button:focus, a:focus, input:focus{
    outline: none;
}
.ql-editor {
    font-family: Merriweather !important;
    font-size: 16px !important;
    border: none !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
}
.ql-editor > p{
    line-height: 1.9em !important;
}
.ql-container {
    font-family: Merriweather !important;
    border: none !important;
    background-color: rgba(0,0,0,0) !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.gradient{
    background: #12c2e9;  /* fallback for old browsers */
background: -webkit-linear-gradient(to top, #f64f59, #c471ed, #12c2e9);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to top, #f64f59, #c471ed, #12c2e9); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
@media(max-width: 768px){
    .alert{
        left: 50%;
        transform: translate(-50%, 0);
    }
}
</style>
