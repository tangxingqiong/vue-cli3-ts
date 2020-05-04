<!--城市级联选择-->
<template>
    <div class="city-selector-wrap">
        <Select v-model="area" @on-change="areaChange" class="w210" placeholder="请选择省份">
            <Option v-for="area in cityData.cityData1" :key="area[id] || area.id" :value="area[id] || area.id">{{area[name] || area.name}}</Option>
        </Select>&nbsp;&nbsp;&nbsp;&nbsp;
        <Select v-model="city" @on-change="cityChange" class="w210" placeholder="请选择城市">
            <Option v-for="city in cityData.cityData2" :key="city[id] || city.id" :value="city[id] || city.id">{{city[name] || city.name}}</Option>
        </Select>
    </div>
</template>

<script>
    export default {
        name: 'citySelector',
        props: ['value', 'cityData', 'name', 'id'],
        data() {
            return {
                //选中的area
                area: null,
                //选中的city
                city: null,
            }
        },
        computed: {
            //city列表
            // cities(){
            //     return this.cityData.filter(item => !item.parent)
            // },
            // //area列表
            // areas(){
            //     return this.cityData.filter(item => item.parent === this.city)
            // }
        },
        methods: {
            //area改变
            areaChange(area){
                this.city = null
                this.$emit('getCityList', this.area)
                this.updateValue()
            },
            //city改变
            cityChange(city){
                this.updateValue()
            },
            //提交更改
            updateValue(){
                this.$emit('input', [this.area, this.city])
            },
            //获取value
            getValue(){
                let value = this.value
                if(value){
                    this.area = value[0]
                    this.city = value[1]
                }else{
                    this.area = null
                    this.city = null
                }
            }
        },
        created(){
            this.getValue()
        },
        watch: {
            'value'(value){
                this.getValue()
            }
        }
    }
</script>