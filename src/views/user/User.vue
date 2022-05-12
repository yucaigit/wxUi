<template>
   <div class="userBox">
     <el-table
       :data="tableData"
       style="width: 100%">
       <el-table-column
         label="头像"
         width="180">
         <template slot-scope="scope">
           <el-image :src="scope.row.ua"></el-image>
         </template>
       </el-table-column>

       <el-table-column
         property="uphone"
         label="电话"
         width="250">
       </el-table-column>
       <el-table-column
         label="姓名"
         width="250">
         <template slot-scope="scope">
           <el-popover trigger="hover" placement="top">
             <p>姓名: {{ scope.row.uname }}</p>
             <p>住址: 甘肃省兰州市</p>
             <div slot="reference" class="name-wrapper">
               <el-tag size="medium">{{ scope.row.uname }}</el-tag>
             </div>
           </el-popover>
         </template>
       </el-table-column>
       <el-table-column label="操作">
         <template slot-scope="scope">
           <el-button
             size="mini"
             @click="handleEdit(scope.$index, scope.row)">详情</el-button>
           <el-button
             size="mini"
             type="danger"
             @click="handleDelete(scope.$index, scope.row)">封号</el-button>
         </template>
       </el-table-column>
     </el-table>

     <el-dialog
       title="提示"
       :visible.sync="dialogVisible"
       width="30%"
       :before-close="handleClose">
       <span>是否封号处理？</span>
       <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="fenhaofunction">确 定</el-button>
  </span>
     </el-dialog>

   </div>

</template>

<script>
    export default {
        name: "User",
        data(){
            return{
              dialogVisible:false,
              tableData: [],
              userId:0
            }
        },
        methods:{
            handleEdit(index, row) {
              console.log(index, row);
            //  带参跳转到详情页面
              this.$router.push({
                path:'/userdetail',
                query:{userid:row.uid}
              })
            },
            handleDelete(index, row) {
              this.userId = row.uid
              this.dialogVisible=true
            },
          //
          async fenhaofunction(){

              let lesult = await this.$get('/mesage/updateUser?userid='+this.userId)
              if (lesult){
                this.dialogVisible = false
                alert("成功提示!")
              }
          },
          handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
          },

          async getUserAll(){
              let result = await this.$get('/message/getAllUsers');
              this.tableData = result

          },
          handleCurrentChange(item){
              console.log('分页'+item)
          },


        },
      created() {
          this.getUserAll();

      }
    }
</script>

<style scoped>
.userTib{
  margin-left: 100px;
  font-weight: 100;
}
  .el-image{
    height: 40px;
    width: 40px;
  }
</style>
