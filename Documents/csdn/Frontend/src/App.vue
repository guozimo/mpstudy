<template>
    <div id="app">
        <v-header></v-header>
        <router-view/>
    </div>
</template>

<script>
    import vHeader from "./pages/home/header";
    export default {
        name: 'App',
        components: {
            vHeader
        }
    }
</script>

<style lang="less">

</style>
