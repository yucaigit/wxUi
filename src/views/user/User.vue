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
             <p>住址: {{ scope.row.uname }}</p>
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
             @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
           <el-button
             size="mini"
             type="danger"
             @click="handleDelete(scope.$index, scope.row)">删除</el-button>
         </template>
       </el-table-column>
     </el-table>

     <el-pagination
       background
       @current-change="handleCurrentChange"
       :current-page="1"
       :page-size="5"
       layout="prev, pager, next"
       :total="1000">
     </el-pagination>
   </div>

</template>

<script>
    export default {
        name: "User",
        data(){
            return{
              tableData: [],
            }
        },
        methods:{

            handleEdit(index, row) {
              console.log(index, row);
            },
            handleDelete(index, row) {
              console.log(index, row);
            },
          async getUserAll(){
              let result = await this.$get('/message/getAllUsers');
              this.tableData = result
              console.log(result)
          },
          handleCurrentChange(item){
              console.log('分页'+item)
          }

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
