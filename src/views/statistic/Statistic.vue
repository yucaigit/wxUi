<template>
    <div>
<!--      按钮区域-->
      <div>
      <el-row>
        <el-button @click="showbox1(1)">订单统计</el-button>
        <el-button @click="showbox2(2)">用户统计</el-button>
        <el-button @click="showbox3(3)">用户量统计</el-button>
      </el-row>
      </div>
<!--      内容区域-->

      <div v-if="current===1">
        成交量/时间
        <div style="width: auto;height: 400px" id="main1">
        </div>
      </div>

      <div v-if="current===2">
        <div style="width: auto;height: 400px" id="main2">
        </div>
      </div>



      </div>

</template>

<script>
    export default {
        name: "Statistic",
      mounted() {
          this.getGoodsName()
      },
      data(){
          return{
            current:1,
            goodsName:[],
            nameVlue:[]
          }
      },
      methods:{
        async getGoodsName(){
          let result =  await this.$get('/getNames')
          console.log(result)
          this.goodsName = result
          this.getGoodsValue()
        },
        async getGoodsValue(){
          let result = await this.$get('/getValues')
          this.nameVlue = result
        },
          showbox1(e){
            this.current = e
            this.echartsInit1()
          },
        showbox2(e){
          this.current = e
          this.echartsInit2()
        },
        echartsInit1() {
          //柱形图
          //因为初始化echarts 的时候，需要指定的容器 id='main'
          this.$echarts.init(document.getElementById('main1')).setOption({
            xAxis: {
              type: 'category',
              data: this.goodsName
            },
            yAxis: {
              type: 'value'
            },
            series: [{
              data: this.nameVlue,
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
              }
            }]
          })
        },


        echartsInit2() {
          //柱形图
          //因为初始化echarts 的时候，需要指定的容器 id='main'
          this.$echarts.init(document.getElementById('main2')).setOption({
            xAxis: {
              data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
            },
            yAxis: {},
            series: [
              {
                type: 'scatter',
                data: [220, 182, 191, 234, 290, 330, 310]
              }
            ]
          })
        },

      }
    }
</script>

<style scoped>

</style>
