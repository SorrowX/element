<template>
    <div class="wrapper">
        <el-scrollbar wrapClass="scrollbar-wrapper">
            <div style="height: 1500px">hi</div>
            <!-- <div class="content">hi</div> -->
        </el-scrollbar>
    </div>
    
</template>

<script>
	import 'packages/theme-chalk/src/index.scss';
    import ElScrollbar from '../packages/scrollbar/src/main'

	export default {
		components: { ElScrollbar }
	}


</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    .wrapper {
        height: 100vh;
        overflow: hidden;
        background: #dee3ed;
        /* border: 1px solid red; */
    }
    .content {
        height: 100px;
        font-size: 20px;
    }
    .el-scrollbar {
        height: 100%;
    }
    .el-scrollbar__wrap {
        overflow-x: hidden;
    }
</style>