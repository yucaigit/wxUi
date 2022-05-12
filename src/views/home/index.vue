<template>
    <div class="page">
<!--      <div style="height: 20px"></div>-->
      <div class="box1">
        <el-tag>数据概括</el-tag>
<!--        <div style="width: 100%;height: 10px;background-color: darkgray"></div>-->
      </div>

      <div class="box3">
        <div>
          <el-descriptions class="margin-top"  :column="3"  border>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                用户数
              </template>
              {{userNum}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                商品数
              </template>
              {{goodsNum}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                订单数
              </template>
              {{orderNum}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                成交量
              </template>
              <i class="el-icon-office">{{succNum}}</i>
            </el-descriptions-item>
<!--            <el-descriptions-item>-->
<!--              <template slot="label">-->
<!--                <i class="el-icon-office-building"></i>-->
<!--                联系地址-->
<!--              </template>-->
<!--              江苏省苏州市吴中区吴中大道 1188 号-->
<!--            </el-descriptions-item>-->
          </el-descriptions>
        </div>
      </div>

      <div class="box2">

        <div class="search">
          <div class="s1">
        <el-select v-model="value" placeholder="商品类型">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
          </el-option>

        </el-select>
          </div>
          <div class="s2">
          <el-input
            placeholder="商品名称"
            v-model="inputV"
            clearable>
          </el-input>
          </div>
          <div>
            <el-button type="primary" icon="el-icon-search" @click="searchkw">搜索</el-button>
          </div>
        </div>
<!--        <div style="height: 10px"></div>-->
        <div class="contB">
        <div class="cont">
          <div class="cont1">

          <div class="box4">
            <div>
            <div class="num"><el-tag type="success">{{orderNum}}</el-tag></div>
            <div class="textdin">  <el-link type="info" disabled>成交订单</el-link></div>
            <div class="img">
              <el-image src="static/orderd.png" style="width: 80px;height: 80px"></el-image>
            </div>
            </div>

          </div>

            <div class="box4">
              <div>
                <div class="num"><el-tag type="success">{{onlineUser}}</el-tag></div>
                <div class="textdin">  <el-link type="info" disabled>在线用户</el-link></div>
                <div class="img">
                  <el-image src="static/user.png" style="width: 80px;height: 80px"></el-image>
                </div>
              </div>

            </div>

            <div class="box4">
              <div>
                <div class="num"><el-tag type="success">{{money}}￥</el-tag></div>
                <div class="textdin">  <el-link type="info" disabled>成交金额</el-link></div>
                <div class="img">
                  <el-image src="static/money.png" style="width: 80px;height: 80px"></el-image>
                </div>
              </div>

            </div>



        </div>
          <el-divider></el-divider>
        </div>

        </div>
      </div>

<!--      嵌套表格-->
      <el-drawer
        title="全部商品"
        :visible.sync="table"
        direction="rtl"
        size="50%">
        <el-table :data="goodsList">
          <el-table-column property="gadress" label="地址" width="150"></el-table-column>
          <el-table-column property="gname" label="姓名" width="200"></el-table-column>
          <el-table-column property="gprice" label="价格"></el-table-column>
          <el-table-column property="gdateUp" label="上架日期"></el-table-column>
        </el-table>
      </el-drawer>

      <!--      嵌套表格-->
      <el-drawer
        title="商品详情"
        :visible.sync="drawer"

        :before-close="handleClose">
        <table>
          <p>商品编号:  {{drawerinfo.gid}}</p>
          <p>发货地址:      {{drawerinfo.gadress}}</p>
          <p>
            商品图片 <el-image :src="drawerinfo.gimg1" class="imgsClass"></el-image>
          </p>
          <P>商品名称:  {{drawerinfo.gname}}</P>
          <p>上架日期:       {{drawerinfo.gdateUp}}</p>
          <p>商品描述:     {{drawerinfo.gdescribe}}</p>
          <p>商品所属人:     {{userName}}</p>
          <p>商品价格:    {{drawerinfo.gprice}}￥</p>
        </table>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            drawer:false,
            drawerinfo:[],
            userName:'',
            onlineUser:0,
            userNum:0,
            goodsNum:0,
            orderNum:0,
            succNum:0,
            options: [],
            //搜索内容
            value:'',
            inputV:'',
            money:0,
            //抽屉
            table: false,
            dialog: false,
            loading: false,
            gridData: [{
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }, {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            }],

          //  单个信息
            goods:{},
            goodsList:[]
          }
      },
      created() {
          this.getAllattr()
          this.getUserNum()
          this.getGoodsNum()
          this.getOrderNum()
          this.getAllMoney()
          this.getOneOrder()
      },
      methods:{
          async getAllattr(){
            let result = await this.$get('/mesage/getattrbute')
            this.options = result
            console.log(result)
          },
        //关闭抽屉
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        open1(e){
          const h = this.$createElement;

          this.$notify({
            title: '搜索建议',
            message: h('i', {style: 'color: teal'}, e)
          });
        },
        searchkw(){
          let value =this.value //类别
          let inValue = this.inputV //商品名称
          if(value==='' && inValue===''){
            let str = '请输入要搜索的值'
            this.open1(str)
          }
          if(value!=='' && inValue===''){
            this.getGoodsByAttribute(value)
          }
          if (value===''&& inValue!==''){
            this.getGoodsByName(inValue)
          }
          if (value!=='' && inValue!==''){
            this.getGoodsBynameAndAtr(value,inValue)
          }
        },
        async getGoodsByName(e){
          let result =await this.$get('/mesage/getGoodsByName?gName='+e)
          if (result.length===0){
            let str = '未搜索要匹配的内容!'
            this.open1(str)
          }else {
            this.drawerinfo = result
            let uid = result.guid
            this.getUserName(uid)
            this.drawer = true
          }
          console.log(result)
        },
        async getUserName(e){
          let result = await this.$get('/mesage/getUserName?uid='+e)
          this.userName =  result
        },
        //属性列表
        async getGoodsByAttribute(e){
          let result = await this.$get('/mesage/getGoodsByattr?aName='+e)
          if (result.length===0){
            let str = '未搜索要匹配的内容!'
            this.open1(str)
          }
          else {
            this.goodsList = result
            this.table =true
          }
          this.value=''
          console.log(result)
        },
      //  组合查询
        async getGoodsBynameAndAtr(e,e2){
          let result = await this.$get('/mesage/getGoodsnameAttr?attr='+e+'&&gName='+e2)
          if (result==null||result.length===0){
            let str = '未搜索要匹配的内容!'
            this.open1(str)
          }
          this.rawerinfo = result
        },

        //用户数
        async getUserNum(){
            let result = await this.$get('/mesage/getUsersNum')
            this.userNum = result
        },
      //  商品数
        async getGoodsNum(){
            let result = await this.$get('/mesage/getGoodsNum')
          this.goodsNum =result

        },
        //订单数量
        async getOrderNum(){
            let result = await this.$get('/mesage/getOrderNum')
          this.orderNum = result
        },
        async getOnlineUser(){
            let result = await this.$get('/onLineUsers')
           this.onlineUser = result
        },
        async getAllMoney(){
            let result = await this.$get('/mesage/getallMoney')
          this.money = result
        }
      }
    }
</script>

<style scoped>
.page{

  width: 100%;
  height: 100%;
}
.box1{
  width: 100%;
  height: 40px;
  background-color: white;
  margin-top: 2px;
  border-color: white;
}
  .box2{
    /*margin-top: 2px;*/
  }
  .search{
    background-color: white;
    display: flex;
  }
  .s2{
    margin-left: 30px;
    margin-right: 30px;
  }
  .cont{
    height: 400px;
    width: 100%;
    border-color: white;
    margin-top: 10px;
  }
  .contB{
    background-color: white;
  }
  .box4{
    margin-right: 20%;
    background-color: white;
    height: 150px;
    width: 150px;
    border-radius: 1px;
    border-style: solid;
    border-color: gainsboro;
  }
  .cont1{
    margin: 40px;
    display: flex;
  }
  .num{
    margin-left: 30px;
    margin-bottom: 6px;
  }
  .textdin{

    margin-left: 30px;
  }
  .img{
    margin-left: 20px;
  }
.imgsClass{
  width: 200px;
  height: 200px;
}
</style>
