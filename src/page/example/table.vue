<!--
 * @Author: your name
 * @Date: 2019-11-09 19:34:21
 * @LastEditTime: 2019-11-10 16:54:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
        <app-title title="表格综合"></app-title>
        <app-notes>本页实际路径: src/page/example/table.vue   table根组件为ElementUI。table配置请查看官方文档，table分页请查看“系统组件-功能类-表格分页”</app-notes>
        <!-- 搜索 -->
        
        <app-toolbar>
             <el-input v-model="filtertext" style="width:22%" placeholder="请输入查询条件"></el-input>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="primary" @click="addNew">新增</el-button>
            <el-button type="primary" @click="editRow">修改</el-button>
            <el-button type="primary" @click="deleteRow">删除</el-button>
        </app-toolbar>
        <!-- 表格体 -->
        <el-table :data="tableData"  border stripe style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50"/>
            <el-table-column type="index" width="50"/>
            <el-table-column prop="title" label="标题" width="180"/>
            <el-table-column prop="description" label="描述" />
            <el-table-column prop="imgUrl" label="图片" width="110">
                <template slot-scope="scope">
                    <img :src="scope.row.imgUrl" style="width:80px;height:60px;" />
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" width="180"/>
            <el-table-column prop="stock" label="库存" width="180"/>
            
        </el-table>
    
        <el-dialog title="新增商品画面" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="form" :rules="addRules">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="标题" :label-width="formLabelWidth" prop="title">
                            <el-input v-model="form.title" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="价格" :label-width="formLabelWidth" prop="price">
                            <el-input v-model="form.price" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="图片" :label-width="formLabelWidth" prop="imgUrl">
                            <el-input v-model="form.imgUrl" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="描述" :label-width="formLabelWidth" prop="description">
                            <el-input v-model="form.description" />
                            <!-- <el-select v-model="form.description" placeholder="请选择">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select> -->
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="库存" :label-width="formLabelWidth" prop="stock">
                            <el-input v-model="form.stock" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ID" :label-width="formLabelWidth">
                            <el-input v-model="form.id" disabled />
                        </el-form-item>
                    </el-col>
                </el-row>
                
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="insertOne">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'exampleTable',
    data() {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form:{
                title:'',
                price:'',
                imgUrl:'',
                description:'',
                stock:'',
                id:'',
            },
            filtertext:'',
            tableData: [],
            multipleSelection:'',
            addRules: {
                title: [ {required: true, message: '', trigger: 'blur'}],
                price: [ {required: true, message: '', trigger: 'blur'}],
                imgUrl: [ {required: true, message: '', trigger: 'blur'}],
                description: [ {required: true, message: '', trigger: 'blur'}],
                stock: [ {required: true, message: '', trigger: 'blur'}],
            },
        }
    },
    mounted() {
        // this.getTableData()
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 获取table数据
        getTableData() {
            let url= "http://localhost:8080/item/list"
            let param = new URLSearchParams()
            param.append("title",this.filtertext||"")
            this.$post(url, param,{showLoading:true}).then(res=>{
                // console.log(res.data)
                this.tableData = res.data
                // debugger
            }).catch(err=>{
                 console.log(err)
                 this.$message.error(`获取数据失败`)
            })
        },
        addNew(){
            for(let i in this.form){
                this.form[i] =''
            }
            this.dialogFormVisible =true
        },
        editRow(){
            if(this.multipleSelection.length!==1){
                return this.$message.error(`请选择一条数据`)
            }
            for(let i in this.form){
                this.form[i] = this.multipleSelection[0][i]
            }
            this.dialogFormVisible =true
        },
        deleteRow(){
            debugger
            if(this.multipleSelection.length!==1){
                return this.$message.error(`请选择一条数据`)
            }
            this.$confirm('确认删除吗？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        .then(() => {
            let url= "http://localhost:8080/item/delete"
            let param = new URLSearchParams()
            param.append("idList", this.multipleSelection[0].id)
            this.$post(url, param).then(res=>{
                // console.log(res.data)
                this.getTableData()
                return this.$message.success(`删除数据成功！`)
            }).catch(err=>{
                 console.log(err)
                 this.$message.error(`删除数据失败`)
            })
        })

            
        },
        
        insertOne(){
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let param = new URLSearchParams()
                    for(let i in this.form){
                        if((i!='id')&& !this.form[i]){
                            return this.$message.error(`请输入数据`)
                        }
                        param.append(i, this.form[i])
                    }
                    debugger
                    let url= "http://localhost:8080/item/create"
                    this.$post(url, param).then(res=>{
                        // console.log(res.data)
                        this.getTableData()
                        this.dialogFormVisible =false
                        return this.$message.success(`新增数据成功！`)
                    }).catch(err=>{
                        console.log(err)
                        this.$message.error(`新增数据失败`)
                    })
                } else {
                    return false
                }
            });
            
        },
        search(){
            this.getTableData()
        }
    }
}
</script>
