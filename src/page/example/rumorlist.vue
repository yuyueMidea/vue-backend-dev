<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-12-02 10:52:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
            <p>
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
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(item,index) in tableData" :key="index" :title="item.title" :name="index">
                    <h3><a :href="item.rumormongerurl"  target="_blank">{{item.rumormongername}}</a></h3>
                    <div style="text-indent:2em;">
                        <p><span>造谣者：</span><a :href="item.informerurl"  target="_blank">{{item.informername}}</a></p>
                        <p><span>谣言内容：</span>{{item.rumortext}}</p>
                        <p><span>真实结果：</span>{{item.result}}</p>
                    </div>
                </el-collapse-item>
            </el-collapse>
       

    </div>
</template>

<script>
import dialogDrag from '@/util/directives'

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
            activeName: '1'
        }
    },
    mounted() {
        this.getAlltotal()
        this.getTableData()
    },
    methods: {
        getAlltotal() {
            this.$post("http://localhost:8080/rumor/listCount", {}).then(res => {
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
                page: this.page,
                pageSize: this.pageSize,
            }
            this.$post("http://localhost:8080/rumor/list", obj).then(res => {
                this.tableData = res.data
            })
        },
    }
}
</script>
<style scoped>

</style>