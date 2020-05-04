<template>
    <div>
        <div class="module-name">
            当前悬赏任务：9
        </div>
        <div class="module-content">
            <Table :columns="columns1" :data="data1" border></Table>
        </div>
    </div>
</template>

<script>
    export default {
        name: '',
        data() {
            return {
                columns1: [
                    {
                        title: '序号',
                        key: 'index',
                        type: 'index',
                    },
                    {
                        title: '媒体',
                        key: 'media'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '单价',
                        key: 'price'
                    },
                    {
                        title: '总金额',
                        key: 'total'
                    },
                    {
                        title: '需求数',
                        key: 'requestNumber'
                    },
                    {
                        title: '进度',
                        key: 'speed'
                    },
                    {
                        title: '发布时间',
                        key: 'releaseTime'
                    },
                    {
                        title: '状态',
                        key: 'status'
                    },
                    {
                        title: '操作',
                        key: 'handle'
                    }
                ],
                data1: [
                    {
                        media: '抖音',
                        name: '评论',
                        price: '6',
                        total: '500',
                        requestNumber: 3000,
                        speed: '30%',
                        releaseTime: '2019-12-19',
                        status: '进行中',
                    }
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    
</style>