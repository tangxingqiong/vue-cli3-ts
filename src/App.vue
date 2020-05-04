<template>
    <div id="main" class="app-main">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'app',
}
</script>
<style>
html,body{
    width: 100%;
    height: 100%;
    margin:0;
}
body{
    background-color: #f1f3fc !important;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>