<template>
  <div>
  <div> <el-button type="primary" @click="dialogFormVisiblefa">添加分类</el-button></div>

  <el-table
    :data="tableData"
    style="width: 100%">

    <el-table-column
      label="分类名"
      width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.aname }}</p>
          <p>数量: {{ scope.row.ac }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.aname }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="修改时间"
      width="180">
      <template slot-scope="scope">
        <i class="el-icon-time">{{scope.row.ac.toString().substring(0,10)}}</i>

        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row),dialogFormVisiblef=true">详情</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div>
      <el-dialog title="添加商品" :visible.sync="dialogFormVisiblef">
        <el-input v-model="inputName" placeholder="请输入分类名称"></el-input>
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
    data() {
      return {
        dialogFormVisiblef:false,
        inputName:'',
        tableData: [],
        sortDetail:{},
        sortNum:0,
      }
    },
    created() {
      this.getSort()
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row.aid);
        this.getSortDetail(row.aid)
        this.getSortNum(row.aid)
        //  带参跳转到详情页面
        this.$router.push({
          path:'/sortdetail',
          query:{
            aid:row.aid
          }
        })
      },
      async getSortDetail(e){
        let result= await this.$get('/mesage/getSortDetail?aid='+e)
        this.sortDetail = result
      },
      async getSortNum(e){
        let result = await this.$get('/mesage/getSortNum?aid='+e)
        this.sortNum = result
      },

      handleDelete(index, row) {
        console.log(index, row);
        this.deleteSort(row.aid)
      },
      dialogFormVisiblec(){
        this.dialogFormVisiblef = false
      },
      //得到所有分类
      async getSort(){
        let result = await this.$get('/mesage/getSort')
        this.tableData = result
        console.log(result)
      },
      open1(e){
        const h = this.$createElement;
        this.$notify({
          title: '操作建议',
          message: h('i', {style: 'color: teal'}, e)
        });
      },
      dialogFormVisiblefa(){
        this.inputName=' '
        this.dialogFormVisiblef=true
      },
      dialogFormVisible(){
        if (this.inputName===' '){
          this.open1('填写分类信息')
          return
        }
        this.addSort()
      },
      async addSort(){
        let result = await this.$get('/mesage/isExitSort?name='+this.inputName)
        if (result){
          this.open1('已有此类别，请填写别的类别')
        }else {
          let res = await this.$get('/mesage/addSort?name='+this.inputName)
          this.open1('添加成功')
          this.dialogFormVisiblef=false
        }
        this.getSort()
      },
      async deleteSort(e){
        let result = await this.$get('/mesage/deleteSort?aid='+e)
        this.open1('删除成功!')
        this.getSort()
      }
    }
  }
</script>

<style scoped>

</style>
