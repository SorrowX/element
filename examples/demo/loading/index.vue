<template>
    <div class="loading-demo">
        <div 
            class="content-box" 
            v-loading="loading1"
        >
            我是内容1
        </div>
        <el-button @click="loading1 = !loading1">toggle</el-button>
        <hr />

        <div 
            class="content-box" 
            v-loading="loading2"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.5)"
        >
            我是内容2
        </div>
        <el-button @click="loading2 = !loading2">toggle</el-button>

        <hr />
        <el-button
            type="primary"
            @click="openFullScreen1"
            v-loading.lock.fullscreen="fullscreenLoading">
            全屏且禁止滚动
        </el-button>
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        data() {
            return {
                loading1: true,
                loading2: true,
                fullscreenLoading: false
            }
        },
        methods: {
            openFullScreen1() {
                this.fullscreenLoading = true
                setTimeout(() => {
                    this.fullscreenLoading = false
                }, 3 * 1000)
            }
        }
    }
</script>

<style lang="scss">
    .content-box {
        width: 400px;
        height: 200px;
        border: 1px solid red;
    }
</style>