<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-27 11:43:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
                <span>新闻一览</span>
                <el-input v-model="searchtext" style="width:22%" placeholder="请输入关键词"></el-input>
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
            <ul class="the_news_List">
                <li v-for="(item,index) in tableData" :key="index">
                    <p @click="editOne(item)">{{item.title}}</p>
                </li>
            </ul>
              
        <el-dialog v-dialogDrag :title="currentTitle" :visible.sync="dialogTableVisible" width="800px" :close-on-press-escape=false :close-on-click-modal=false>
            <div class="the_sub_form" v-html="currentRow"></div>
    
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
            page: 1,
            pageSize:10,
            alltotal: 0,
            currentTitle:'',
            currentRow:'',
            searchtext:'',
            tableData:  [],
            currentPage2: 1,
        }
    },
    mounted() {
        this.getAlltotal()
    },
    methods: {
        getAlltotal() {
            this.$post("http://localhost:8080/news/listCount", {}).then(res => {
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
        
        editOne(val){
            this.currentTitle = val.title;
            this.currentRow =val.content.replace(/\n/g,'<br/>');
            this.dialogTableVisible =true
        },
        // 获取table数据
        getTableData() {
            let obj ={
                title: this.searchtext,
                page: this.page,
                pageSize: this.pageSize,
            }
            this.$post("http://localhost:8080/news/list", obj).then(res => {
                this.tableData = res.data
            })
        },
    }
}
</script>
<style scoped>
.the_news_List{
    padding: 3px; overflow: hidden
}
.the_news_List>li{
    border-bottom: 1px solid #ccc;
    padding: 11px;
}.the_news_List>li p{
    cursor: pointer
}
.el-dialog__body{
    padding-top: 0px !important;
}
.the_sub_form{
    height: 450px;
    overflow: hidden;
    border: 1px solid #ccc;
    overflow-y: auto;padding: 21px;
    font-size: 16px;
    line-height: 1.5em;background: #e9dfc7;text-indent: 2em;
}
</style>