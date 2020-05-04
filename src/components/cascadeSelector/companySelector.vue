<!--区域公司级联选择-->
<template>
    <div class="company-selector-wrap">
        <FormItem label="区域公司" class="inlineblock">
            <Select :disabled="disabled" v-model="regionalCompany" @on-change="regionalCompanyChange" class="w210" placeholder="请选择区域公司">
                <Option v-for="item in companyData.company1" :key="item.id" :value="item.id">{{item[name] || item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="城市公司" class="inlineblock">
            <Select :disabled="disabled" v-model="cityCompany" @on-change="cityCompanyChange" class="w210" placeholder="请选择城市公司">
                <Option v-for="item in companyData.company2" :key="item.id" :value="item.id">{{item[name] || item.name}}</Option>
            </Select>
        </FormItem>
        <FormItem label="项目公司" class="inlineblock">
            <Select :disabled="disabled" v-model="projectCompany" @on-change="projectCompanyChange" class="w210" placeholder="请选择项目公司">
                <Option v-for="item in companyData.company3" :key="item.id" :value="item.id">{{item[name] || item.name}}</Option>
            </Select>
        </FormItem>
    </div>
</template>

<script>
    export default {
        name: 'companySelector',
        props: ['value', 'companyData', 'name', 'disabled'],
        data() {
            return {
                //区域公司
                regionalCompany: null,
                //城市公司
                cityCompany: null,
                //项目公司
                projectCompany: null,
            }
        },
        computed: {
            //区域公司列表
            // regionalCompanies(){
            //     return this.companyData.filter(item => !item.parent)
            // },
            //城市公司列表
            // cityCompanies(){
            //     return this.companyData.filter(item => item.parent === this.regionalCompany)
            // },
            //项目公司列表
            // projectCompanies(){
            //     return this.companyData.filter(item => item.parent === this.cityCompany)
            // }
        },
        methods: {
            //区域公司改变
            regionalCompanyChange(regional){
                this.cityCompany = null
                this.projectCompany = null
                this.$emit('getCompany2', this.regionalCompany)

                this.updateValue()
            },
            //城市公司改变
            cityCompanyChange(city){
                this.projectCompany = null
                this.$emit('getCompany3', this.cityCompany)

                this.updateValue()
            },
            //项目公司改变
            projectCompanyChange(project){
                this.updateValue()
            },
            //提交更改
            updateValue(){
                this.$emit('input', [this.regionalCompany, this.cityCompany, this.projectCompany])
            },
            //获取value
            getValue(){
                let value = this.value
                if(value){
                    this.$nextTick(()=> {
                        this.regionalCompany = value[0]
                        this.cityCompany = value[1]
                        this.projectCompany = value[2]
                    })
                }else{
                    this.regionalCompany = null
                    this.cityCompany = null
                    this.projectCompany = null
                }
            }
        },
        created(){
            this.getValue()
        },
        watch: {
            value(value){
                this.getValue()
            }
        }
    }
</script>

<style lang="less" scoped>
    
</style>