<template>
    <div class="grid-test">
        <!-- <el-row>
            <el-col>
                <div class="grid-content"></div>
            </el-col>
        </el-row> -->
        <!-- <el-row>
            <el-col :span="24">
                <div class="grid-content"></div>
            </el-col>
        </el-row> -->
        <!-- <el-row>
            <el-col :span="12">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content"></div>
            </el-col>
        </el-row> -->
        <!-- <el-row>
            <el-col :span="6">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content"></div>
            </el-col>
        </el-row> -->
        <!-- <el-row>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content"></div>
            </el-col>
        </el-row> -->
        <!-- <hr /> -->

        <!-- <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content"></div></el-col>
            <el-col :span="6"><div class="grid-content"></div></el-col>
            <el-col :span="6"><div class="grid-content"></div></el-col>
            <el-col :span="6"><div class="grid-content"></div></el-col>
        </el-row> -->
        <!-- <hr /> -->

        <!-- <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content"></div></el-col>
            <el-col :span="6" :offset="6"><div class="grid-content"></div></el-col>
        </el-row> -->
        <!-- <el-row>
            <el-col :span="12" :offset="6" :push="5"><div class="grid-content"></div></el-col>
        </el-row> -->
        <!-- <el-row>
            <el-col :span="12" :offset="6" :pull="6"><div class="grid-content"></div></el-col>
        </el-row> -->
        <!-- <hr /> -->

        <!-- <el-row :gutter="20" type="flex" justify="center" align="middle" style="height: 100px">
            <el-col :span="4"><div class="grid-content"></div></el-col>
            <el-col :span="4"><div class="grid-content"></div></el-col>
            <el-col :span="4"><div class="grid-content"></div></el-col>
        </el-row> -->
        <!-- <hr /> -->

        <!-- <el-row :gutter="10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content"></div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content"></div></el-col>
            <el-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11"><div class="grid-content"></div></el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1"><div class="grid-content"></div></el-col>
        </el-row> -->

        <!-- <el-row :gutter="10">
            <el-col
                :xs="24"
                :sm="12" 
                :md="8"
                :lg="6"
            >
                <div class="grid-content">1</div>
            </el-col>
            <el-col
                :xs="24"
                class="hidden-sm-only"
                :md="8"
                :lg="6"
            >
                <div class="grid-content">2</div>
            </el-col>
            <el-col
                :xs="24"
                class="hidden-sm-only hidden-md-only"
                :lg="6"
            >
                <div class="grid-content">3</div>
            </el-col>
            <el-col
                :xs="24"
                :sm="12" 
                :md="8"
                :lg="6"
            >
                <div class="grid-content">4</div>
            </el-col>
        </el-row> -->

        <el-row :gutter="10">
            <el-col
                :xs="{ span: 24 }"
                :sm="{ span: 12 }" 
                :md="8"
                :lg="6"
            >
                <div class="grid-content">1</div>
            </el-col>
            <el-col
                :xs="{ span: 24 }"
                :sm="{ span: 12 }"
                :md="8"
                :lg="6"
            >
                <div class="grid-content">2</div>
            </el-col>
            <el-col
                :xs="{ span: 24 }"
                :sm="{ span: 12 }"
                :md="8"
                :lg="6"
            >
                <div class="grid-content">3</div>
            </el-col>
            <el-col
                :xs="{ span: 24 }"
                :sm="{ span: 12 }"
                :md="24"
                :lg="6"
            >
                <div class="grid-content">4</div>
            </el-col>
        </el-row>

    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .grid-content {
        height: 36px;
        border: 1px solid rebeccapurple;
        text-align: center;
        line-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>