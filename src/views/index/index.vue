<template>
    <div>
        <div class="module-name" @click="download">待审核</div>
        <div class="module-content text-align-c">
            <Row>
                <Col span="8">
                    <div class="font36">235</div>
                    <div class="text">任务审查</div>
                    <DatePicker v-model="searchDateTime" type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
                </Col>
                <Col span="8">
                    <div class="font36">235</div>
                    <div class="text">会员审查</div>
                </Col>
                <Col span="8">
                    <div class="font36">235</div>
                    <div class="text">提现审查</div>
                </Col>
            </Row>
        </div>

        <div class="module-name">任务看板</div>
        <div class="module-content text-align-c">
            <Row>
                <Col v-for="(item, index) in taskList" :key="index" span="4">
                    <div class="font24">{{_formatNum(item.num)}}</div>
                    <div class="text">{{item.name}}</div>
                </Col>
            </Row>
        </div>

        <div class="module-name">用户看板</div>
        <div class="module-content text-align-c">
            <Row>
                <Col v-for="(item, index) in userKanban" :key="index" span="4">
                    <div class="font24">{{_formatNum(item.num)}}</div>
                    <div class="text">{{item.name}}</div>
                </Col>
            </Row>
        </div>

        <div class="module-name">资金看板</div>
        <div class="module-content text-align-c">
            <Row>
                <Col v-for="(item, index) in capitalKanban" :key="index" span="4">
                    <div class="font24">{{_formatNum(item.num)}}</div>
                    <div class="text">{{item.name}}</div>
                </Col>
            </Row>
        </div>
    </div>
</template>

<script>
import {formatNum} from '@/libs/utils.js'
export default {
    name: 'index',
    data() {
        return {
            taskList: [
                {
                    name: '进行中任务',
                    num: '30',
                },
                {
                    name: '抖音',
                    num: '6',
                },
                {
                    name: '快手',
                    num: '23',
                },
                {
                    name: '头条',
                    num: '78',
                },
                {
                    name: '微信',
                    num: '200',
                },
                {
                    name: '微博',
                    num: '672',
                },
            ],
            userKanban: [
                {
                    name: '用户总量',
                    num: '315698',
                },
                {
                    name: '黑名单',
                    num: '6',
                },
                {
                    name: '会员数量',
                    num: '23',
                },
                {
                    name: '白银会员',
                    num: '78',
                },
                {
                    name: '黄金会员',
                    num: '200',
                },
                {
                    name: '钻石会员',
                    num: '672',
                },
            ],
            capitalKanban: [
                {
                    name: '悬赏发布金额',
                    num: '75698',
                },
                {
                    name: '悬赏完成金额',
                    num: '6',
                },
                {
                    name: '用户总余额',
                    num: '23',
                },
                {
                    name: '会员费总金额',
                    num: '78',
                },
                {
                    name: '提现总金额',
                    num: '200',
                }
            ],
            searchDateTime: [],
        }
    },
    methods: {
        _formatNum (num) {
            return formatNum(num)
        },
        download(){
            var data = [[1],[2],[3]]
            
            let dataCsv = 'data:text/csv;charset-utf-8,\ufeff' + data
            const link = document.createElement('a')
            link.setAttribute('href', dataCsv)
            link.setAttribute('download', 'aaa.csv')
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        },
    },
    created () {
        
    },
}
</script>

<style lang="less" scoped>
    .module-name{
        margin: 5px 0 20px 0;
    }
    .module-content{
        min-height: 150px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 20px;
        .font36{
            font-size: 36px;
            margin-top: 30px;
            color: @03081A;
        }
        .font24{
            font-size: 24px;
            margin-top: 40px;
            color: @03081A;
        }
    }
</style>