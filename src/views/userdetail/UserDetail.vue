<template>
  <div>
    <el-button type="danger" round v-if="userinfo.ustate===1" @click="updateUserState">解除封禁</el-button>

    <el-descriptions title="用户信息">
      <el-descriptions-item label="用户名">{{userinfo.uname}}</el-descriptions-item>
      <el-descriptions-item label="手机号">{{userinfo.uphone}}</el-descriptions-item>
      <el-descriptions-item label="用户状态">{{userinfo.ustate==0?'正常':'封禁'}}
      </el-descriptions-item>
      <el-descriptions-item label="备注">
        <el-tag size="small">{{userAdress.detailAdress}}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="联系地址">{{userAdress.roughAdress}}</el-descriptions-item>
    </el-descriptions>

    <div>
      <el-button @click="userZhexiantu">查看用户历史购买记录</el-button>
    </div>

    <div style="width: auto;height: 400px" id="main">
    </div>
  </div>
</template>

<script>
    export default {
        name: "UserDetail",
      data(){
        return{
          userid:0,
          userinfo:{
          },
          userAdress:{},
          timeArr:[],
          numbArr:[],
          orders:[],
        }
      },
      methods:{
        //  修改用户状态
        async updateUserState(){
          let result = this.$get('/mesage/updateUserState?uid='+this.userid)
          this.getUserInfo()
        },
        async getUserInfo(){
          let result = await this.$get('/mesage/getUserInfo?uid='+this.userid)
         // console.log(result)
          this.userinfo = result
          this.getUserAdress(result.adressId)
          console.log(this.userinfo)
        },
        async getUserAdress(res){
          let result  = await this.$get('/mesage/getUserAdress?userid='+this.userid)
          this.userAdress = result
          console.log(result)
        },
        //该用户历史购买记录
        async userZhexiantu(){
          let result = await this.$get('/mesage/getUserHestory?userid='+this.userid);
          this.orders = result
          var userOrder = result
          console.log(userOrder)
          this.timeArr=[]
          this.numbArr=[]
          var hashmap = new Map()
          for (var i=0;i<userOrder.length;i++){
            let isExit = hashmap.has((userOrder[i].orderSendtime.toString()).substring(0,10))
            if (isExit){
              let value = hashmap.get((userOrder[i].orderSendtime.toString()).substring(0,10))
              hashmap.set((userOrder[i].orderSendtime.toString()).substring(0,10),value+userOrder[i].orderAmount)
            }else {
              hashmap.set((userOrder[i].orderSendtime.toString()).substring(0,10),userOrder[i].orderAmount)
            }
          }
          for (let key of hashmap.keys()){
            this.timeArr.push(key)
          }
          for (let value of hashmap.values()){
            this.numbArr.push(value)
          }

          this.$echarts.init(document.getElementById('main')).setOption({
            title: {
              text: '个人用户订单'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['数量/时间', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.timeArr
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '数量/时间',
                type: 'line',
                stack: 'Total',
                data: this.numbArr
              },
              // {
              //   name: 'Union Ads',
              //   type: 'line',
              //   stack: 'Total',
              //   data: [220, 182, 191, 234, 290, 330, 310]
              // },
              // {
              //   name: 'Video Ads',
              //   type: 'line',
              //   stack: 'Total',
              //   data: [150, 232, 201, 154, 190, 330, 410]
              // },
              // {
              //   name: 'Direct',
              //   type: 'line',
              //   stack: 'Total',
              //   data: [320, 332, 301, 334, 390, 330, 320]
              // },
              // {
              //   name: 'Search Engine',
              //   type: 'line',
              //   stack: 'Total',
              //   data: [820, 932, 901, 934, 1290, 1330, 1320]
              // }
            ]
          })
        }
      },
      created() {
          this.userid = this.$route.query.userid
        this.getUserInfo()
      },

    }
</script>

<style scoped>

</style>
