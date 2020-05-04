import appRouter from '@/router/menuPage';

const app = {
    state: {
        // 顶部导航
        menuList: [],
        routers: [
            ...appRouter
        ],
        //需要展开的菜单数组
        openedSubmenuArr: [],
    },
    mutations: {

    },
    getters: {

    },
    mutations: {
        //更新顶部导航数据
        initMenulist(state) {
            let menuList = []
            
            // 获取需要显示的列表项
            for(let i = 0; i < appRouter.length; i ++ ){

                let newItem =  Object.assign({},appRouter[i]);

                if(newItem.children && newItem.children.length){
                    // 如果只有一个子节点，直接显示子节点
                    if(newItem.children.length == 1){
                        // todo 直接显示子节点
                        newItem.name = newItem.children[0].name
                        newItem.path = newItem.children[0].path
                        newItem.children = null;
                    }
                    menuList.push(newItem);
                }
            }
            state.menuList = menuList;
        },
        // 添加侧边栏展开菜单
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }

            if (!hasThisName && !isEmpty) {
                let currentPathObj = state.routers.filter(item => {
                    if (!item.children) {
                        return item.name === name;
                    } else {
                        let i = 0;
                        let childArr = item.children;
                        let len = childArr.length;
                        while (i < len) {
                            if (childArr[i].name === name) {
                                return true;
                            }
                            i++;
                        }
                        return false;
                    }
                })[0];

                if(currentPathObj && currentPathObj.name && state.openedSubmenuArr.indexOf(currentPathObj.name) < 0){
                    state.openedSubmenuArr.length = 0;
                    state.openedSubmenuArr.push(currentPathObj.name);
                }
            }
        },
    },
}

export default app;