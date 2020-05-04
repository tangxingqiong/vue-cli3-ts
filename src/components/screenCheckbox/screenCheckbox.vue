<template>
    <Poptip placement="bottom-start" class="screen-checkbox" @on-popper-show="checkVal = checkedVal">
        <span class="title" :class="active && 'active'">{{title}} <Icon type="ios-funnel" /></span>
        <div slot="content">
            <CheckboxGroup v-model="checkVal" class="check-box">
                <Checkbox v-for="item in list" :label="item[id] || item.id">{{item[name] || item.name}}</Checkbox>
            </CheckboxGroup>
            <div class="bottom-btn clearfix">
                <Button type="primary" size="small" class="butt-ok" @click="buttOk">筛选</Button>
                <Button size="small" class="reset-btn" @click="checkVal=[];$emit('checkCancel', checkVal)">重置</Button>
            </div>
        </div>
    </Poptip>
</template>

<script>
    export default {
        name: 'screenCheckbox',
        props: {
            title: String,
            list: Array,
            active: Boolean,
            name: String,
            id: String,
            checkedVal: Array
        },
        data() {
            return {
                checkVal: [],
            }
        },
        methods: {
            buttOk(){
                this.$emit('checkVlues', this.checkVal);
                // 点击筛选时强制关闭浮框
                document.getElementById('main').click()
            }
        }
    }
</script>

<style lang="less" scoped>
.screen-checkbox{
    .title{
        cursor: pointer;
        &:hover,&.active{
            color: @primary;
        }
    }
    .check-box{
        max-height: 200px;
        overflow-y: auto;
        text-align: left;
        .ivu-checkbox-wrapper{
            display: block;
            padding: 2px 0;
        }
    }
    .bottom-btn {
        // text-align: right;
        padding: 10px 0;
        .reset-btn{
            margin-left: 15px;
        }
    }
}
</style>