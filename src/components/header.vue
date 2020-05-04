<template>
    <div class="page-header">
        <router-link :to="{ name: 'index'}"><div class="logo fl">点点赞后台管理系统</div></router-link>
        <div class="user fr">
            <Avatar size="small" src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
            <span class="margin-left-10 margin-right-10">系统管理员</span>
            <Icon type="ios-arrow-forward" />
        </div>
        
    </div>
</template>
<script>
    export default {
        name: 'topheader',
        computed: {
            user() {
                return this.$store.state.user.userInfo || {};
            },
            //导航数据
            menuList(){
                return this.$store.state.app.menuList
            },
            //当前导航高亮
            menuHighlightName(){
                return this.$store.state.app.menuHighlightName
            }
        },
        methods:{
            changeMenu(active){
                active !== this.$route.name && this.$router.push({
                    name: active
                })
            },
            userMenu(name){
                if(name=='logout'){
                    //清除token
                    localStorage.removeItem('token');
                    //设置vuex store
                    this.$store.commit('setUserInfo', {})
                    this.$store.commit('setToken', '')
                    //跳转
                    this.$router.push({name: 'login'});
                }
                
            },
            info(item, event){
                if ( event && event.preventDefault ) {
                            event.preventDefault()//非IE浏览器
                } else { window.event.returnValue = false; } //IE浏览器

                // if(item.name == 'engineering' || item.name == 'chengben'){
                    this.$Message.error('您没有权限查看该模块')
                    
                    return false
                // }
            }
        }
    }
</script>

<style lang="less" scoped>
.page-header{
    height:40px;
    line-height: 40px;
    background: @primary;
    padding:0 20px;
    min-width:@minwidth;
    .logo{
        color: #fff;
        font-size: 14px;
    }
    .user{
        color: #fff;
    }
}
</style>
