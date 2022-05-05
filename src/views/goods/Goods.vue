<template>
  <div class="userBox">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="商品图片"
        width="180">
        <template slot-scope="scope">
          <el-image :src="scope.row.gimg1"></el-image>
        </template>
      </el-table-column>

      <el-table-column
        property="gadress"
        label="商品地址"
        width="160">
      </el-table-column>

      <el-table-column
        property="gdescribe"
        label="商品描述"
        width="200">
      </el-table-column>

      <el-table-column
        property="gb"
        label="审核情况"
        width="220">
        <template slot-scope="scope">
          <div @click="changeState(scope.row.gb,scope.row.gid)">
          <el-switch
            style="display: block"
            v-model="scope.row.gb==0?false:true"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="已审核"
            inactive-text="未审核">
          </el-switch>
          </div>
        </template>

      </el-table-column>
      <el-table-column
        label="商品状态"
        width="160">
        <template slot-scope="scope">
          <p v-if="scope.row.gb==0" style="color: brown">未审核</p>
          <p  style="color: green" v-else>已审核</p>
        </template>
      </el-table-column>
      <el-table-column
        property="gname"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row),dialogFormVisiblef=true">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="商品信息" :visible.sync="dialogFormVisiblef">
      <el-form model="formda">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="formda.gAdress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品地址" :label-width="formLabelWidth">
          <el-input v-model="formda.gName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述信息" :label-width="formLabelWidth">
          <el-input v-model="formda.gDescribe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisiblec">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible">确 定</el-button>
      </div>
    </el-dialog>


    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="this.current"
      :page-size="this.pagesize"
      layout="prev, pager, next"
      :total="this.total">
    </el-pagination>
  </div>

</template>

<script>

  export default {
    name: "Goods",
    data(){
      return{
        dialogFormVisiblef: false,

        value2: true,
        current:1,
        pagesize:3,
        total:5,
        formda:{
          gId:0,
          gAdress:'',
          gDescribe:'',
          gName:'',
        },
        formLabelWidth: '120px',

        tableData: [],

      }
    },
    methods:{
      dialogFormVisible(item){
        this.updateGoods(this.formda)
      },
      dialogFormVisiblec(item){
        location.reload()
      },
      async updateGoods(item){
        let rusult =  await this.$post('/mesage/updateGoods',item)
        if (rusult) alert("修改成功"), location.reload();
      },
      async deleteGoods(item){
        let rusult =  await this.$post('/mesage/deleteGoods',{gid:item})
        if (rusult) location.reload();
      },
      handleEdit(index, row) {
        console.log(index, row);
        this.formda.gId = row.gid
        this.formda.gAdress = row.gadress
        this.formda.gDescribe = row.gdescribe
        this.formda.gName = row.gname
      },
      handleDelete(index, row) {
        this.deleteGoods(row.gid)
        this.$notify({
          title: '成功',
          message: '这是一条成功的提示消息',
          type: 'success'
        });
      },
      async getUserAll(num) {
        const res = await this.$get("/mesage/findAll",{pageNum:num})
        this.tableData = res.list
        this.current =res.pageNum
        this.pagesize =res.pageSize
        this.total =res.total
        // console.log(res)
      },
      async changeState(gb,gid){
        let result = await this.$get("/changeGb",{gb,gid})
        if (result){
          // location.reload(); 都可已
          this.$router.go(0);
        }
      },
      handleCurrentChange(item){
       this.getUserAll(item)
      }
    },
    created() {
      this.getUserAll(1);
    }
  }
</script>

<style scoped>
  .userTib{
    margin-left: 100px;
    font-weight: 100;
  }
  .el-image{
    height: 100px;
    width: 80px;
  }
</style>
