<style lang="less">
    @import './sidebarMenu.less';
</style>

<template>
    <div class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <sidebarMenuLabel
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
        ></sidebarMenuLabel>
    </div>
</template>

<script>
import sidebarMenuLabel from './components/sidebarMenuLabel.vue';
// import util from '@/libs/util';

export default {
    name: 'sidebarMenu',
    components: {
        sidebarMenuLabel,
    },
    props: {
        menuList: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            default: 'dark',
            // validator (val) {
            //     // return util.oneOf(val, ['dark', 'light']);
            // }
        },
        openNames: {
            type: Array
        }
    },
    methods: {
        // 侧边栏跳转
        handleChange (name) {
            let willpush = true;
            if (this.beforePush !== undefined) {
                if (!this.beforePush(name)) {
                    willpush = false;
                }
            }
            if (willpush) {
                this.$router.push({
                    name: name
                });
            }
            this.$emit('on-change', name);
        }
    }
};
</script>
