<template>
  <div class="box3">
    <div>
      <el-descriptions class="margin-top"  :column="3"  border>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            分类名称
          </template>
          {{sortDetail.aname}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            商品数
          </template>
          {{sortNum}}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div>
      <el-link>商品列表<i class="el-icon-view el-icon--right"></i> </el-link>
    </div>
    <div class="updateSort">
      <el-input
        placeholder="修改分类名称"
        v-model="inputNum"
        clearable>
      </el-input>
      <el-button type="primary" @click="updateSort">确认修改</el-button>
    </div>

    <div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="上架日期"
          prop="gdateUp">
        </el-table-column>
        <el-table-column
          label="商品名称"
          prop="gname">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">

          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row),dialogFormVisiblef=true">修改分类</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div>

      <el-dialog title="修改分类信息" :visible.sync="dialogFormVisiblef">
<!--        <el-form model="formda">-->
<!--          <el-form-item label="商品名称" :label-width="formLabelWidth">-->
<!--            <el-input v-model="formda.gAdress" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="商品地址" :label-width="formLabelWidth">-->
<!--            <el-input v-model="formda.gName" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="描述信息" :label-width="formLabelWidth">-->
<!--            <el-input v-model="formda.gDescribe" autocomplete="off"></el-input>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.aname"
            :label="item.aname"
            :value="item.aname">
          </el-option>
        </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisiblec">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            aid:0,
            sortDetail:{},
            sortNum:0,
            inputNum:'',
            goodsList:[],
            tableData: [],
            dialogFormVisiblef:false,


            options: [],
            value: '',
            goodsid:0
          }
      },
      created() {
        this.aid = this.$route.query.aid
        console.log(this.aid)
        this.getSortDetail(this.aid)
        this.getSortGoods(this.aid)
        this.getSortNum(this.aid)
        this.getSort()
      },
      methods:{
        async getSort(){
          let result = await this.$get('/mesage/getSort')
          this.options = result
          console.log(result)
        },

        async getSortDetail(e){
          let result= await this.$get('/mesage/getSortDetail?aid='+e)
          this.sortDetail = result
        },
        async getSortGoods(e){
          let result = await this.$get('/mesage/getSortAGoods?aid='+e)
          this.goodsList = result
          this.tableData = result
          console.log(result)
          if (result.length===0){
            this.open2()
          }
        },
        open2() {
          this.$notify({
            title: '警告',
            message: '该分类属下下没有商品',
            type: 'warning'
          });
        },

        async getSortNum(e){
          let result = await this.$get('/mesage/getSortNum?aid='+e)
          this.sortNum = result
        },

        handleEdit(index, row) {
          this.goodsid = row.gid
        },
        handleDelete(index, row) {
          this.deleteGoodsB(row.gid)
        },
        async deleteGoodsB(e){
          let result = await this.$get('/mesage/deleteGoodsT?gid='+e)
          this.open1('删除成功')
          this.getSortGoods(this.aid)
        },
        async updateSort(){
          if (this.inputNum ===''){
            alert('未输入分类名称')
          }else {
            let result = await this.$get('/mesage/updateSort?aid='+this.aid+"&name="+this.inputNum)
            this.inputNum=''
          }
          this.getSortDetail(this.aid)
        },
        dialogFormVisible(){
          if (this.value===''){
            alert('未选择分类')
            return
          }else {
            this.updateGoodsAttrbuite(this.goodsid,this.value)
          }

        },
        dialogFormVisiblec(){
          this.dialogFormVisiblef = false
        },
        async updateGoodsAttrbuite(gid,name){
          let result = await this.$get('/mesage/updateGoodsAtt?gid='+gid+"&&name="+name)
          this.dialogFormVisiblef = false
          alert('修改成功!')
          this.getSortGoods(this.aid)
        },
        open1(e) {
          this.$notify({
            title: '成功',
            message: e,
            type: 'success'
          });
        },
      }
    }
</script>

<style scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  .updateSort{
    display: flex;
    width: 300px;
  }
</style>
