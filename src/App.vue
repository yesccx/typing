<template>
    <div id="app">
        <router-view class="page-container" />
    </div>
</template>

<script>
    export default {
        name: 'App'
    };
</script>

<style lang="scss">
    @import "~@/assets/scss/overwrite-element.scss";
    @import "~@/assets/scss/theme.scss";
    @import "~@/assets/scss/faster.scss";
    @import "~@/assets/scss/common.scss";

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }
</style>
