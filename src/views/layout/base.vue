<template>
    <div class="main-base-wrap">
        <div class="main-header-cn">
            <HeadNav></HeadNav>
        </div>

        <div class="sidebar-menu-con">
            <sidebarMenu
                :open-names="openedSubmenuArr"
                :menu-list="menuList">
            </sidebarMenu>
        </div>

        <!-- <div class="single-page-con" :style="{minHeight: `calc(100% - 87px)`}"> -->
        <div class="single-page-con" :style="{minHeight: `calc(100% - 72px)`}">
            <div class="bread-nav">
                <Breadcrumb separator="—">
                    <BreadcrumbItem to="/">首页</BreadcrumbItem>
                    <BreadcrumbItem to="/components/breadcrumb">任务审核</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div class="single-page">
                <!-- <keep-alive> -->
                    <router-view></router-view>
                <!-- </keep-alive> -->
            </div>
        </div>
    </div>
</template>
<script>
import HeadNav from '@/components/header'
import sidebarMenu from "../../components/sidebarMenu/sidebarMenu";
export default {
    components:{
        HeadNav,
        sidebarMenu,
    },
    data () {
        return {
            //默认展开菜单
            openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
        }
    },
    computed: {
        // 侧边栏导航数据
        menuList () {
            return this.$store.state.app.menuList
        },
    },
    methods: {
        init(){
            if(this.$route.name){
                    // 更新菜单栏
                this.$store.commit('addOpenSubmenu',this.$route.name);
            }
        },
    },
    watch: {
        '$route' (to){
            if(this.$route.name){
                    // 更新菜单栏
                this.$store.commit('addOpenSubmenu',this.$route.name);
            }
            // debugger
            // console.log(to)
        }
    },
    mounted () {
        this.init();
    },
}
</script>
