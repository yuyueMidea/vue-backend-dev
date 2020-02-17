<template>
  <div class="form-container" :class="{ formExpand: isActive }">
    <div class="btnGroup">
      <el-button type="primary" :class="{ btnExpand: isActive }" @click="isActive=!isActive" size="mini"><i class="el-icon-arrow-up"></i></el-button>
      <el-button type="primary" @click="reset" size="mini">重置</el-button>
      <el-button type="primary" size="mini" @click="query" >查询</el-button>
    </div>
    <el-form ref="formData" :model="formData" label-width="80px">
      <el-row>
        <el-col :span="8" v-for="(item,k) in formArray">
          <el-form-item :label="item.label" :label-width="formLabelWidth">
            <el-select v-if="item.type === 'select'" v-model="formData[item.prop]" clearable>
              <el-option
                v-for="subitem in item.options"
                :key="subitem.value + '.' + Math.random()"
                :value="subitem.value"
                :label="subitem.label"
              />
            </el-select>
            <el-date-picker v-else-if="item.type === 'date'" v-model="formData[item.prop]" type="date"
                placeholder="选择日期"/>
            <el-input v-else v-model="formData[item.prop]" clearable/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  export default{
    name:'formWrapper',
    data(){
      return{
        isActive: false,
        formData:{},
        formLabelWidth: '100px',
      }
    },
    methods: {
      query () {
        this.$emit('getFormData', this.formData)
      },
      reset () {      //重置所有过滤条件
        for(let i in this.formData){
          this.formData[i]='';
        }
      },
    },
    props: {
      // 父页面传值--->配置项
      name: {
        type: String,
        default: null
      },
      // 当前form绑定的 data 对象
      formArray: {
        type: Array,
        default: null
      },
    }
  }
</script>
<style scoped lang="scss">

    .form-container{
      height: 50px; position: relative;
      .el-form{
        padding-right: 150px;
      }
      .btnGroup{
        position: absolute; top: 14px; right: 5px;
        z-index: 999;
      }
    }
    .formExpand{
      height: auto;
    }
    .btnExpand i{
      transform: rotate(180deg);
    }
</style>
