<template>
    <div>
        <div>{{ data }}</div>
        <Input v-model="data" />
        <Button type="primary" @click="handle">btn</Button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name: '',
    data() {
        return {
            data: 123
        }
    },
    methods: {
        handle () {
            let mess: number = Number(this.data)
            this.data = mess + 1
            console.log('mess: ', this.data)
        },
    },
})
</script>

<style lang="" scoped>
    
</style>