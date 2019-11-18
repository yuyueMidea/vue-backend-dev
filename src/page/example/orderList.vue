<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-18 16:29:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
                <el-input v-model="searchtext" style="width:22%" placeholder="请输入电影名"></el-input>
                <el-button type="primary" @click="getTableData">查询</el-button>
            </p>
            <p>
                <el-pagination @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage2"
                    :page-sizes="[10, 20, 60, 100]"
                    :page-size="10"
                    layout="sizes, prev, pager, next"
                    :total="alltotal"/>
            </p>
        <!-- 列表体 -->
            <ul class="the_movie_List">
                <li v-for="(item,index) in tableData" :key="index">
                    <img :src="item.image" :alt="item.name" :title="item.name" @click="editOne(item)">
                    <p>
                        <a :href="item.href" target="_blank">{{item.name}}评分{{item.score}}</a>
                    </p>
                    
                </li>
            </ul>
              
        <el-dialog v-dialogDrag title="电影詳情頁面" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
            <div class="the_sub_form">
                <div class="left">
                    <img :src="form.image" alt="">
                </div>
                <div class="right">
                    <p style="font-size:18px;font-weight:700">标题:{{form.name}}</p>
                    <p>评分:{{form.score}}</p>
                    <p><span style="color:red;width:111px;display:inline-block;">价格:￥{{form.price}}</span></p>
                    <p>
                        <span>數量</span><el-input-number style="width:40%" v-model="itemQty" :min="1" :max="10"/>
                        <span style="width:120px;display:inline-block;color:red;">總價{{pricePotal}}</span>
                    </p>
                    <p>
                        
                        
                        <el-button type="primary" @click="addCart">加入購物車</el-button>
                        <el-badge :value="orderList.length" class="item" style="float:right;margin-right: 111px;">
                            <el-popover
                                placement="top"
                                title="购物车信息"  width="400" trigger="click" >
                                <el-table :data="orderList" border stripe>
                                    <el-table-column width="150" property="name" label="商品名称"></el-table-column>
                                    <el-table-column width="50" property="itemQty" label="数量"></el-table-column>
                                    <el-table-column width="80" property="price" label="价格">
                                        <template slot-scope="scope">
                                            <span>￥{{scope.row.price}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column width="50" property="price" label="删除">
                                        <template slot-scope="scope">
                                            <i class="el-icon-delete" style="cursor: pointer;color: red;" @click="delCart(scope.row)"></i>
                                        </template>
                                    </el-table-column>
                                </el-table>
                                <el-button slot="reference">購物車</el-button>
                            </el-popover>
                            </el-badge>
                    </p>
                </div>
            </div>
    
      </el-dialog>

    </div>
</template>

<script>
import dialogDrag from '@/util/directives'
import { mapState, mapActions } from 'vuex'

export default {
    name: 'promoTable',
    data() {
        return {
            itemQty: 1,
            dialogTableVisible: false,
            formLabelWidth:'100px',
            page: 1,
            pageSize:10,
            alltotal: 0,
            form:{
                id:'',
                name:'',
                image:'',
                score:'',
                price:'35',
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
        this.getAlltotal()
    },
    methods: {
        getAlltotal() {
            this.$post("http://localhost:8080/movies/listCount", {}).then(res => {
                if(res.status=='success'){
                    this.alltotal = res.data
                }
            })
        },
        handleSizeChange(val){
            this.pageSize =val
            this.getTableData()
        },
        handleCurrentChange(val){
            this.page =val
            this.getTableData()
        },
        addCart(){
            let res ={
                itemId: this.checkedData.id,
                itemQty: this.itemQty,
                price: this.form.price,
                name: this.form.name,
                pricePotal: this.pricePotal,
            }
            this.$store.commit("cart/setOrderList", res)
            this.$message.success(`商品加入购物车成功！`) 
        },
        delCart(val){
            this.$store.commit("cart/delOrderList", val)
        },
        editOne(val){
            this.itemQty =1
            for(let i in this.form){
                this.form[i] = val[i]
            }
            this.form.price = this.form.price||35
            this.checkedData = val;
            this.dialogTableVisible = true;
        },
        // 获取table数据
        getTableData() {
            let obj ={
                name: this.searchtext,
                page: this.page,
                pageSize: this.pageSize,
            }
            this.$post("http://localhost:8080/movies/list", obj).then(res => {
                this.tableData = res.data
            })
        },
    }
}
</script>
<style scoped>
.the_movie_List{
    padding: 3px; overflow: hidden
}
.the_movie_List>li{
    float: left; width: 270px; height: 400px;overflow: hidden;
    border: 1px solid #ccc; padding: 3px; margin: 5px
}
.the_movie_List>li img{
    width: 240px; height: 360px; cursor: pointer
}
.the_movie_List>li span{
    line-height: 40px;margin-left: 11px;
}
.el-dialog__body{
    padding-top: 0px !important;
}
.the_sub_form{
    height: 444px;
    border: 1px solid #ccc; padding: 22px; margin: 5px
}
.the_sub_form .left, .the_sub_form .right {
    width: 48%; float: left;
}
.the_sub_form .right {
    padding: 11px;
}
.the_sub_form .right>p{
    line-height: 50px
}
.the_sub_form img{
    width: 330px; height: 440px;border: 1px solid #ccc;
}
.the_sub_form .the_cart{
    float: right; width: 111px; height: 111px;
    border: 1px solid #ccc;
}
</style>