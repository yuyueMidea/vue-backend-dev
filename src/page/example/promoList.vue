<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-11 17:41:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
        <div>
            <p>
                <el-input v-model="itemName" style="width:15%" placeholder="请输入itemName"></el-input>
                <el-input v-model="promoName" style="width:15%" placeholder="请输入promoName"></el-input>
                 <el-date-picker v-model="startDate" style="width:30%" type="datetimerange"  
                 value-format="yyyy-MM-dd hh:mm:ss"  placeholder="选择日期时间" />
                 <el-date-picker v-model="endDate" style="width:30%" type="datetimerange"
                 value-format="yyyy-MM-dd hh:mm:ss"  placeholder="选择日期时间" />
                <el-button type="primary" @click="getTableData">查询</el-button>
                
            </p>
            <p>
                <el-button type="primary" @click="addNew">新增</el-button>
                <el-button type="primary" @click="editOne">修改</el-button>
                <el-button type="primary" @click="deleteRow">删除</el-button>
            </p>
        </div>
            <el-table :data="tableData" border stripe  @selection-change="checkChange">
                <el-table-column width="50" type="selection" />
                <el-table-column type="index" width="50"/>
                <el-table-column prop="itemName" label="商品名稱" sortable width="250" :show-overflow-tooltip="true"/>
                <el-table-column prop="promoName" label="活動名稱" sortable :show-overflow-tooltip="true"/>
                <el-table-column prop="promoItemPrice" label="活動價格" sortable :show-overflow-tooltip="true"/>
                <el-table-column prop="startDate" label="開始時間" sortable width="200" :show-overflow-tooltip="true"/>
                <el-table-column prop="endDate" label="結束時間" sortable width="200" :show-overflow-tooltip="true"/>
            </el-table>
              
        <el-dialog title="新增商品" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
        <el-form ref="form" :model="form" label-width="80px" class="the_sub_form">
          <el-row>
            <el-col :span="12">
              <el-form-item label="itemId" :label-width="formLabelWidth"><el-input-number v-model="form.itemId"/></el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="ID" :label-width="formLabelWidth"><el-input v-model="form.id" disabled/></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="活動價格" :label-width="formLabelWidth"><el-input-number v-model="form.promoItemPrice"/></el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="活動名稱" :label-width="formLabelWidth"><el-input v-model="form.promoName"/></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="開始時間" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.startDate" type="datetime"  
                    value-format="yyyy-MM-dd hh:mm:ss"  placeholder="选择開始時間" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="結束時間" :label-width="formLabelWidth">
                  <el-date-picker v-model="form.endDate" type="datetime"  
                    value-format="yyyy-MM-dd hh:mm:ss"  placeholder="选择結束時間" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-right: 100px;margin-top: 19px;">
            <el-col :span="24">
              <el-form-item label="" label-width="200px">
                <el-button @click="dialogTableVisible = false" size="small" style="width: 100px">取消</el-button>
                <el-button type="primary" @click="insertOne" size="small" style="width: 100px">確定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
      <p>
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 60, 100]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"/>
      </p>

    </div>
</template>

<script>
export default {
    name: 'exampleTable',
    data() {
        return {
            dialogTableVisible: false,
            formLabelWidth:'100px',
                
            form:{
                id:'',
                itemId:'',
                itemName:'',
                promoName:'',
                promoItemPrice:'',
                startDate:'',
                endDate:'',
            },
            "promoName": "",
            "startDate": "",
            "endDate": "",
            "itemName": "",

            searchtext:'',
            tableData:  [],
            checkedData:'',
            currentPage2: 1,
        }
    },
    mounted() {
        this.getTableData()
    },
    methods: {
        
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            debugger
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            debugger
        },
        checkChange(val) {
            this.checkedData = val;
        },
        addNew(){
            this.form ={
                id:'',
                itemId:'',
                itemName:'',
                promoName:'',
                promoItemPrice:'',
                startDate:'',
                endDate:'',
            },
            this.dialogTableVisible = true;
        },
        editOne(){
            if(this.checkedData.length !==1) {
                return this.$message.info(`请选择一条数据！`)
            }
            for(let i in this.form){
                this.form[i] = this.checkedData[0][i]
            }
            this.dialogTableVisible = true;
        },
        insertOne(){
            if(!this.form.itemId || !this.form.promoName|| !this.form.startDate ||!this.form.endDate){
                return this.$message.info(`请输入必填的数据！`)
            }
            let param = new URLSearchParams()
            param.append("id", this.form.id)
            param.append("itemId", this.form.itemId)
            param.append("promoItemPrice", this.form.promoItemPrice)
            param.append("promoName", this.form.promoName)
            param.append("startDate", this.form.startDate)
            param.append("endDate", this.form.endDate)
            
            this.$post("http://localhost:8080/promo/create",param).then(res => {
                if(res.status=='success'){
                    this.$message.success(`数据保存成功`)
                    this.dialogTableVisible = false;
                    this.getTableData()
                }
                 
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err}`)
            })
        },
        deleteRow(){
            if(this.checkedData.length!==1){
                return this.$message.error(`请选择一条数据`)
            }
            this.$confirm('确认删除吗？', '确认信息', {
                distinguishCancelAndClose: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            })
            .then(() => {
                let url= "http://localhost:8080/promo/delete"
                let param = new URLSearchParams()
                param.append("idList", this.checkedData[0].id)
                this.$post(url, param).then(res=>{
                    if(res.status=='success'){
                        this.getTableData()
                        return this.$message.success(`删除数据成功！`)
                    }
                }).catch(err=>{
                    console.log(err)
                    this.$message.error(`删除数据失败`)
                })
            })
            
        },
        // 获取table数据
        getTableData() {
            let param = new URLSearchParams()
            param.append('itemName', this.itemName )
            param.append('promoName', this.promoName )
            param.append('startDateBegin', this.startDate ? this.startDate[0]:'' )
            param.append('startDateEnd', this.startDate ? this.startDate[1]:'' )
            param.append('endDateBegin', this.endDate ? this.endDate[0]:'' )
            param.append('endDateEnd', this.endDate ? this.endDate[1] :'' )

            this.$post("http://localhost:8080/promo/list",
                param
            ).then(res => {
                if(res.status=='success'){
                    this.tableData = res.data
                }
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        },
    }
}
</script>
