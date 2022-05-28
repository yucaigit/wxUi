<template>
  <div>
    <div>
      <el-row>
        <el-button @click="showbox1(1)">成交记录</el-button>
        <el-button @click="showbox2(2)">动态分析</el-button>
      </el-row>

    </div>

    <div v-show="current===1">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="日期"
          width="160">
          <template slot-scope="scope">{{ (scope.row.orderSendtime.toString()).substring(0,10) }}</template>
        </el-table-column>
        <el-table-column
          prop="users.uname"
          label="姓名"
          width="160">
        </el-table-column>
        <el-table-column
          prop="goods.gname"
          label="购买商品"
          width="180">
        </el-table-column>
        <el-table-column
          prop="goods.gadress"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">查看详情</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
<!--        <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>

    </div>

    <div v-if="current===2">
      <div><p>成交量/日期</p></div>
      <div style="width: auto;height: 400px" id="main">
      </div>
    </div>
    <el-drawer
      title="商品详情"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose">
      <table>
        <p>订单编号:  {{drawerinfo.orderid}}</p>
        <p>订单状态:      {{drawerinfo.orderState}}</p>
        <p>
          商品图片 <el-image :src="drawerinfo.goodsSrc" class="imgsClass"></el-image>
        </p>
        <P>商品名称:  {{drawerinfo.goodsName}}</P>
        <p>上架日期:       {{drawerinfo.goodsupTime}}</p>
        <p>接收人姓名:     {{drawerinfo.resiveName}}</p>
        <p>接收人电话:     {{drawerinfo.resivePhone}}</p>
        <p>接收订单时间:    {{drawerinfo.sendTime}}</p>
      </table>
    </el-drawer>
</div>

</template>

<script>
    export default {
        name: "Order",
      data() {
        return {
          drawer:false,
          direction: 'rtl',
          current:1,
          tableData: [],
          multipleSelection: [],
          timeArr:[],
          numbArr:[],

          drawerinfo:{
            orderid:0,
            resiveName:'',
            resivePhone:'',
            sendTime:'',
            goodsName:'',
            goodsSrc:'',
            goodsupTime:'',
            orderState:0,
          }
        }
      },

      methods: {
        handleEdit(index,row){

          this.drawerinfo.resiveName = row.users.uname
          this.drawerinfo.resivePhone = row.users.uphone

          this.getOneOrder(row.orderId)

          this.drawer = true
        },
        handleDelete(index,row){
          this.deleOrder(row.orderId)
        },
        async deleOrder(e){
          let result = await this.$get('/mesage/deleteOrder?oid='+e)
          alert('delete succcess!')
          this.getOrders()
        },
        //关闭抽屉
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //更据Id的到商品信息
        async getOneOrder(res){
          let result  = await this.$get('/mesage/getOne?orderid='+res)
          this.drawerinfo.orderid = res
          this.drawerinfo.orderState = result.orderState
          this.drawerinfo.sendTime = result.orderEndtime

          this.getGoods(result.goodsId)
        },
        async getUser(res){
          let result = await this.$get('/mesage/getUser?userid='+res);
        },
        async getGoods(res){
          let result = await this.$get('/mesage/getGoods?goodsid='+res)
          this.drawerinfo.goodsupTime = result.gdateUp
          this.drawerinfo.goodsSrc = result.gimg1
          this.drawerinfo.goodsName = result.gname

          console.log(result)
        },


          async getOrders(){
            let result = await this.$get('/message/getOrders')
            this.tableData = result
          },

        showbox1(e){
          this.current=e
        },
        showbox2(e){

          this.current=e
          this.echartsInit()
        },
        toggleSelection(rows) {

          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },

        handleSelectionChange(val) {

          this.timeArr=[]
          this.numbArr=[]
          var hamap = new Map();
          this.multipleSelection = val;
          for (var i=0;i<val.length;i++){
           let isExit =  hamap.has((val[i].orderSendtime.toString()).substring(0,10))
            if (isExit){
              let value = hamap.get((val[i].orderSendtime.toString()).substring(0,10))
              hamap.set((val[i].orderSendtime.toString()).substring(0,10),value+val[i].orderAmount)
            }else {
              hamap.set((val[i].orderSendtime.toString()).substring(0,10),val[i].orderAmount)
            }
          }
          for (let key of hamap.keys()){
            this.timeArr.push(key)
          }
          for (let value of hamap.values()){
            this.numbArr.push(value)
          }
        },

        echartsInit() {
          //柱形图
          //因为初始化echarts 的时候，需要指定的容器 id='main'
          this.$echarts.init(document.getElementById('main')).setOption({
            xAxis: {
              data: this.timeArr
            },
            yAxis: {},
            series: [
              {
                data: this.numbArr,
                type: 'line',
                label: {
                  show: true,
                  position: 'bottom',
                  textStyle: {
                    fontSize: 20
                  }
                }
              }
            ]
          })
        },

      },
      created() {
          this.getOrders();
      }
    }
</script>

<style scoped>
  .imgsClass{
    width: 200px;
    height: 200px;
  }
</style>
