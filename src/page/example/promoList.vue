<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-12 11:34:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
                <el-input v-model="searchtext" style="width:22%" placeholder="请输入查询条件"></el-input>
                <el-button type="primary" @click="getTableData">查询</el-button>
                <!-- <el-button type="primary" @click="addNew">新增</el-button>
                <el-button type="primary" @click="editOne">修改</el-button>
                <el-button type="primary" @click="deleteRow">删除</el-button> -->
            </p>
        <!-- 列表体 -->
            <ul class="the_promoList">
                <li v-for="(item,index) in tableData" :key="index">
                    <img :src="item.imgUrl" :alt="item.description" :title="item.description" @click="editOne(item)">
                    <span>{{item.title}}</span>
                </li>
            </ul>
              
        <el-dialog title="商品詳情頁面" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
            <div class="the_sub_form">
                <div>
                    <img :src="form.imgUrl" alt="">
                        
                </div>
                <p>标题:{{form.title}}</p>
                <p>描述:{{form.description}}</p>
                
                <p><span style="color:red">价格:{{form.price}}</span><span>库存:{{form.stock}}</span></p>
                <p>
                    <span>數量</span><el-input-number style="width:20%" v-model="itemQty" :min="1" :max="10"/>
                    <span style="width:120px;display:inline-block;color:red;">總價{{pricePotal}}</span>
                    <el-button type="primary" @click="addCart">加入購物車</el-button>
                    <el-badge :value="orderList.length" class="item" style="float:right;margin-right: 111px;">
                        <el-popover
                            placement="top"
                            title="购物车信息"  width="300" trigger="click" >
                            <el-table :data="orderList" border stripe>
                                <el-table-column width="150" property="title" label="商品名称"></el-table-column>
                                <el-table-column width="50" property="itemQty" label="数量"></el-table-column>
                                <el-table-column width="80" property="price" label="价格"></el-table-column>
                            </el-table>
                            <el-button slot="reference">購物車</el-button>
                        </el-popover>
                        </el-badge>
                </p>
                
            </div>
    
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
import { mapState, mapActions } from 'vuex'

export default {
    name: 'exampleTable',
    data() {
        return {
            
            itemQty: 1,
            // pricePotal:'',
            dialogTableVisible: false,
            formLabelWidth:'100px',
            form:{
                id:'',
                title:'',
                imgUrl:'',
                description:'',
                price:'',
                stock:'',
            },
            searchtext:'',
            tableData:  [],
            checkedData:'',
            currentPage2: 1,
        }
    },
    computed:{
        pricePotal: function(){
            return this.itemQty * (this.form.price ||'0')
        },
        ...mapState({
            orderList: state => state.cart.orderList,
        })
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
        addCart(){
            let res ={
                itemId: this.checkedData.id,
                itemQty: this.itemQty,
                price: this.form.price,
                title: this.form.title,
                pricePotal: this.pricePotal,
            }
            this.$store.commit("cart/setOrderList", res)
            this.$message.success(`商品加入购物车成功！`) 
        },
       
        addNew(){
            
            this.form={
                id:'',
                title:'',
                imgUrl:'',
                description:'',
                price:'',
                stock:'',
            }
            this.dialogTableVisible = true;
        },
        editOne(val){
            // console.log('tag---  ', this.orderList)
            // debugger
            this.itemQty =1
            for(let i in this.form){
                this.form[i] = val[i]
            }
            this.checkedData = val;
            this.dialogTableVisible = true;
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
                let url= "http://localhost:8080/item/delete"
                let param = new URLSearchParams()
                param.append("idList", this.checkedData[0].id)
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
            let param = new URLSearchParams()
            for(let i in this.form){
                param.append(i, this.form[i]||'')
            }
            if(!param.toString()){
                return this.$message.info(`请输入必填的数据！`)
            }
            this.$post("http://localhost:8080/item/create",
                param
            ).then(res => {
                // console.log('create--->', res)
                 this.$message.success(`数据保存成功`)
                 this.dialogTableVisible = false;
                 this.getTableData()
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err}`)
            })
        },
        // 获取table数据
        getTableData() {
            let param = new URLSearchParams()
            param.append('title', this.searchtext )
            this.$post("http://localhost:8080/item/list",
                param
            ).then(res => {
                // console.log('tableData---', res)
                this.tableData = res.data
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        },
    }
}
</script>
<style scoped>
.the_promoList{
    padding: 3px; overflow: hidden
}
.the_promoList>li{
    float: left; width: 250px; height: 220px;overflow: hidden;
    border: 1px solid #ccc; padding: 3px; margin: 5px
}
.the_promoList>li img{
    width: 240px; height: 180px; cursor: pointer
}
.the_promoList>li span{
    line-height: 40px;margin-left: 11px;
}
.the_sub_form{
    height: 444px;
    border: 1px solid #ccc; padding: 3px; margin: 5px
}
.the_sub_form img{
    width: 400px; height: 300px;border: 1px solid #ccc;
}
.the_sub_form .the_cart{
    float: right; width: 111px; height: 111px;
    border: 1px solid #ccc;
}
</style>