<!--
 * @Author: your name
 * @Date: 2019-11-09 19:34:21
 * @LastEditTime: 2019-11-16 14:49:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\layout\index.vue
 -->
<template>
    <div class="wrapper">
        <template v-if="layout =='left'">
            <header-bar v-once>
                <p slot="logo">商品秒杀系统</p>
            </header-bar>
            <nav-bar :layout="layout"></nav-bar>
        </template>
        <template v-if="layout == 'top'">
            <header-bar>
                <p slot="logo">商品秒杀系统</p>
                <template slot="topnav">
                    <nav-bar :layout="layout"></nav-bar>
                </template>
            </header-bar>
        </template>
        <div class="sys-content" :class="layout">
            <tag-nav></tag-nav>
            <keep-alive :include="tagNavList">
                <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import HeaderBar from './HeaderBar'
import NavBar from './NavBar'
import TagNav from './TagNav'

export default {
    computed: {
        layout(){
            return this.$store.state.navbarPosition
        },
        tagNavList(){
            return this.$store.state.tagNav.cachedPageName
        }
    },
    components:{
        HeaderBar,
        NavBar,
        TagNav
    }
}
</script>