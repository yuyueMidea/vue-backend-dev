<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-16 15:50:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
        <p>GitHub接口系列</p>
        <p>
            <el-input v-model="user" style="width:22%">
                          <el-button slot="append" icon="el-icon-edit-outline" type="primary"
                            @click="getuserData">获取用户</el-button>
                    </el-input>
        <!-- </p>
        <p> -->
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 60, 100]"
            :page-size="per_page"
            style="display: inline-block;"
            layout="sizes, prev, pager, next"
            :total="allTotal"/>
      </p>
        <ul class="the_git_user">
            <li v-for="(v,k) in userListData" :key="k">
                <a :href="v.html_url" target="_blank">
                    <img :src="v.avatar_url" alt="">
                </a>
                <span :title="v.login">{{v.login}}</span>
            </li>
        </ul>
        <!-- 表格体 -->
            <!-- <el-table :data="tableData" border stripe highlight-current-row>
                <el-table-column width="50" type="selection" />
                <el-table-column type="index" width="50"/>
                <el-table-column prop="id" label="ID" sortable width="70" />
                <el-table-column prop="city" label="城市" sortable />
                <el-table-column prop="district" label="区县" sortable />
                <el-table-column prop="area" label="乡镇" sortable />
                <el-table-column prop="xiaoqu" label="小区" sortable />
                <el-table-column prop="price" label="价格" sortable />
                <el-table-column prop="sale" label="销量" sortable />
            </el-table> -->
    </div>
</template>

<script>
export default {
    name: 'userList',
    data() {
        return {
            user: '',
            per_page: 10,
            userListData:  [],
            tableData:  [],
            currentPage2: 1,
            allTotal: 0,
        }
    },
    mounted() {
        this.getuserData()
    },
    methods: {
       
       
        // 获取user数据
        getuserData() {
            if(!this.user) return
            let obj ={
                q: this.user,
                page: this.currentPage2,
                per_page: this.per_page
            }
            this.$get("https://api.github.com/search/users", obj).then(res => {
                // debugger
                this.userListData = res.items
                this.allTotal = res.total_count;
            })
        },
        handleSizeChange(val){
            console.log(`每页 ${val} 条`);
            this.per_page =val;
            this.getuserData()
            // debugger
            
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.currentPage2 =val
            this.getuserData()
            // debugger
            
        },
    }
}
</script>
<style scoped>
.the_git_user li{
    float: left; width: 100px; height: 100px;
    border: 1px solid #ccc; padding: 3px; margin: 11px;
    overflow: hidden
}

.the_git_user li a {
    text-align: center;
    display: block;
}
.the_git_user li a img{
    width: 90px; height: 80px;
}
</style>
