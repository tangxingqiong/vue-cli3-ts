<template>
    <Menu
        ref="sideMenu"
        :active-name="$route.name"
        :open-names="openNames"
        theme="dark"
        width="auto"
        @on-select="changeMenu">
        <template v-for="item in menuList">
            <!-- 单项菜单 -->
            <MenuItem
                v-if="!item.children || !item.children.length"
                :name="item.name"
                :key="'menuitem' + item.name">
                <Icon v-if="item.icon" :type="item.icon" :key="'menuicon' + item.name"></Icon>
                <span class="layout-text" :key="'title' + item.name">{{ item.title }}</span>
            </MenuItem>
            
            <!-- 复合菜单 -->
            <Submenu v-if="item.children && item.children.length" :name="item.name" :key="item.name">
                <template slot="title">
                    <Icon v-if="item.icon" :type="item.icon" :size="iconSize"></Icon>
                    <span class="layout-text">{{ item.title }}</span>
                </template>
                <!-- 子菜单 -->
                <template v-for="child in item.children">
                    <MenuItem :name="child.name" :key="'menuitem' + child.name">
                        <Icon :type="child.icon" :size="iconSize" :key="'icon' + child.name"></Icon>
                        <span class="layout-text" :key="'title' + child.name">{{ child.title }}</span>
                    </MenuItem>
                </template>
            </Submenu>
        </template>
    </Menu>
</template>

<script>
export default {
    name: 'sidebarMenuLabel',
    props: {
        iconSize: Number,
        menuList: Array,
        openNames: Array
    },
    methods: {
        changeMenu (active) {
            this.$emit('on-change', active);
        }
    },
    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
            }
        });
    }
}
</script>

