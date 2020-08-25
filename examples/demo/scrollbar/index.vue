<template>
    <el-scrollbar style="width: 400px; height: 400px;" :native="true">
        <div class="content">
            <p v-for="num in 20" :key="num">{{ num }}</p>
        </div>
    </el-scrollbar>
</template>

<script>
    import '../../../packages/theme-chalk/src/index.scss';
    import ElScrollbar from '../../../packages/scrollbar/src/main'

    export default {
        components: { ElScrollbar }
    }
</script>

<style>
</style>