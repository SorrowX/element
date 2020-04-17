<template>
    <div class="loading-demo">
        <el-button
            type="primary"
            @click="openFullScreen"
        >
            服务方式
        </el-button>
        <hr />
        <div class="content-box"></div>
        <el-button
            type="primary"
            @click="openFullScreen2"
        >
            服务方式2
        </el-button>
        <hr />
    </div>
</template>

<script>
    export default {
        name: 'Loading',
        data() {
            return {
            }
        },
        methods: {
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    loading.close()
                }, 2000)
            },
            openFullScreen2() {
                const loading = this.$loading({
                    target: '.content-box',
                    text: '玩命加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    loading.close()
                }, 3000)

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