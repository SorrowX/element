<template>
    <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->

    <el-tree
      :data="data"
      :props="props"
      :load="loadNode"
      show-checkbox
      lazy
      @check-change="handleCheckChange"
    >
  </el-tree>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1'/* ,
            children: [{
              label: '三级 1-1-1'
            }] */
          }]
        }/* , {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        } */],
        defaultProps: {
          children: 'children',
          label: 'label'
        },

        props: {
          label: 'name',
          children: 'zones',
          isLeaf: 'leaf'
        },
      };
    },
    methods: {
      handleNodeClick() {
        console.log('node-click: ', arguments);
      },

      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ name: 'region' }]);
        }
        if (node.level > 3) return resolve([]);

        setTimeout(() => {
          const data = [{
            name: 'leaf',
            leaf: true
          }, {
            name: 'zone'
          }];

          resolve(data);
        }, 500);
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      }
    }
  };
</script>