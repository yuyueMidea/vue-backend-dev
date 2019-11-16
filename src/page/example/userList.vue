<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-16 15:01:29
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
        </p>
        <!-- 表格体 -->
            <el-table :data="tableData" border stripe highlight-current-row>
                <el-table-column width="50" type="selection" />
                <el-table-column type="index" width="50"/>
                <el-table-column prop="id" label="ID" sortable width="70" />
                <el-table-column prop="city" label="城市" sortable />
                <el-table-column prop="district" label="区县" sortable />
                <el-table-column prop="area" label="乡镇" sortable />
                <el-table-column prop="xiaoqu" label="小区" sortable />
                <el-table-column prop="price" label="价格" sortable />
                <el-table-column prop="sale" label="销量" sortable />
            </el-table>
    </div>
</template>

<script>
export default {
    name: 'userList',
    data() {
        return {
            user: '',
            tableData:  [],
        }
    },
    mounted() {
        this.getuserData()
    },
    methods: {
       
       
        // 获取user数据
        getuserData() {
            debugger
            if(!this.user){
                return
            }
            this.$get("https://api.github.com/search/users",{q: this.user}).then(res => {
                debugger
                if(res.status=='success'){
                    console.log('tableData---', res)
                    debugger
                    this.tableData = res.data
                }
            }).catch(err => {
                this.$message.error(`获取数据失败，失败码：${err.response.status}`)
            })
        },
    }
}
</script>
