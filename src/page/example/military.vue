<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-30 11:41:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
                <el-input v-model="searchtext" style="width:22%" placeholder="请输入"></el-input>
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
              
        <el-dialog v-dialogDrag title="詳情頁面" :visible.sync="dialogTableVisible" width="950px" :close-on-press-escape=false :close-on-click-modal=false>
            <div class="the_sub_form">
                <div class="left">
                    <img :src="form.image" alt="">
                </div>
                <div class="right">
                    <p style="font-size:18px;font-weight:700">标题:{{form.name}}</p>
                    <p>产地:{{form.madein}}---制造商:{{form.producedby}}</p>
                    <p>主要性能:{{form.buju}}---{{form.qty}}---{{form.speed}}---{{form.engine}}</p>
                    <p>主要参数:长{{form.stretch}}---宽{{form.width}}---高{{form.height}}</p>
                    <p>速度:{{form.maxs}}---{{form.maxroute}}---类型:{{form.catalog}}---{{form.type}}</p>
                    <p v-if="form.desc">简介:{{form.desc}}</p>
                  
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
                producedby:'',
                madein: '',
                buju:'',
                qty:'',
                speed:'',
                stretch:'',
                width:'',
                height:'',
                engine:'',
                maxs:'',
                maxroute:'',
                catalog:'',
                type:'',
                desc:'',
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
            this.$post("http://localhost:8080/military/listCount", {}).then(res => {
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
            this.$post("http://localhost:8080/military/list", obj).then(res => {
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
    float: left; width: 370px; height: 200px;overflow: hidden;
    border: 1px solid #ccc; padding: 3px; margin: 5px
}
.the_movie_List>li img{
    width: 350px; height: 160px; cursor: pointer
}
.the_movie_List>li span{
    line-height: 40px;margin-left: 11px;
}
.el-dialog__body{
    padding-top: 0px !important;
}
.the_sub_form{
    height: 580px; overflow: hidden; overflow-y: auto;
    border: 1px solid #ccc; padding: 5px; margin: 0px
}
.the_sub_form .left, .the_sub_form .right {
    width: 99%;
}
.the_sub_form .right {
    padding: 11px;
}
.the_sub_form .right>p{
    line-height: 30px
}
.the_sub_form img{
    width: 710px; height: 330px;border: 1px solid #ccc;
}
.the_sub_form .the_cart{
    float: right; width: 111px; height: 111px;
    border: 1px solid #ccc;
}
</style>