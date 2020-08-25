<template>
  <div
    class="el-tree"
    :class="{
      'el-tree--highlight-current': highlightCurrent,
      'is-dragging': !!dragState.draggingNode,
      'is-drop-not-allow': !dragState.allowDrop,
      'is-drop-inner': dragState.dropType === 'inner'
    }"
    role="tree"
  >
    <el-tree-node
      v-for="child in root.childNodes"
      :node="child"
      :props="props"
      :render-after-expand="renderAfterExpand"
      :show-checkbox="showCheckbox"
      :key="getNodeKey(child)"
      :render-content="renderContent"
      @node-expand="handleNodeExpand">
    </el-tree-node>
    <div class="el-tree__empty-block" v-if="isEmpty">
      <span class="el-tree__empty-text">{{ emptyText }}</span>
    </div>
    <div
      v-show="dragState.showDropIndicator"
      class="el-tree__drop-indicator"
      ref="dropIndicator">
    </div>
  </div>
</template>

<script>
  import TreeStore from './model/tree-store';
  import { getNodeKey, findNearestComponent } from './model/util';
  import ElTreeNode from './tree-node.vue';
  import {t} from 'element-ui/src/locale';
  import emitter from 'element-ui/src/mixins/emitter';
  import { addClass, removeClass } from 'element-ui/src/utils/dom';

  export default {
    name: 'ElTree',

    mixins: [emitter],

    components: {
      ElTreeNode
    },

    data() {
      return {
        store: null,
        root: null,
        currentNode: null,
        treeItems: null,
        checkboxItems: [],
        dragState: {
          showDropIndicator: false,
          draggingNode: null,
          dropNode: null,
          allowDrop: true
        }
      };
    },

    props: {
      data: { // 展示数据
        type: Array
      },
      emptyText: {
        type: String,
        default() {
          return t('el.tree.emptyText');
        }
      },
      renderAfterExpand: {
        type: Boolean,
        default: true
      },
      nodeKey: String, // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
      checkStrictly: Boolean, // 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
      defaultExpandAll: Boolean, // 是否默认展开所有节点
      expandOnClickNode: {
        type: Boolean,
        default: true
      },
      checkOnClickNode: Boolean,
      checkDescendants: { // 是否检查后代
        type: Boolean,
        default: false
      },
      autoExpandParent: { // 展开子节点的时候是否自动展开父节点
        type: Boolean,
        default: true
      },
      defaultCheckedKeys: Array, // 默认勾选的节点的 key 的数组
      defaultExpandedKeys: Array, // 默认展开的节点的 key 的数组
      currentNodeKey: [String, Number], //  当前选中的节点
      renderContent: Function,
      showCheckbox: {
        type: Boolean,
        default: false
      },
      draggable: {
        type: Boolean,
        default: false
      },
      allowDrag: Function,
      allowDrop: Function,
      props: { //  配置选项
        default() {
          return {
            children: 'children',
            label: 'label',
            disabled: 'disabled'
          };
        }
      },
      lazy: { // 是否懒加载子节点，需与 load 方法结合使用
        type: Boolean,
        default: false
      },
      highlightCurrent: Boolean,
      load: Function, // 加载子树数据的方法，仅当 lazy 属性为true 时生效
      filterNodeMethod: Function, // 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
      accordion: Boolean,
      indent: {
        type: Number,
        default: 18
      },
      iconClass: String
    },

    computed: {
      children: {
        set(value) {
          this.data = value;
        },
        get() {
          return this.data;
        }
      },

      treeItemArray() {
        return Array.prototype.slice.call(this.treeItems);
      },

      isEmpty() {
        const { childNodes } = this.root;
        return !childNodes || childNodes.length === 0 || childNodes.every(({visible}) => !visible);
      }
    },

    watch: {
      defaultCheckedKeys(newVal) {
        this.store.setDefaultCheckedKey(newVal);
      },

      defaultExpandedKeys(newVal) {
        this.store.defaultExpandedKeys = newVal;
        this.store.setDefaultExpandedKeys(newVal);
      },

      data(newVal) {
        this.store.setData(newVal);
      },

      checkboxItems(val) {
        Array.prototype.forEach.call(val, (checkbox) => {
          checkbox.setAttribute('tabindex', -1);
        });
      },

      checkStrictly(newVal) {
        this.store.checkStrictly = newVal;
      }
    },

    methods: {
      filter(value) {
        if (!this.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
        this.store.filter(value);
      },

      getNodeKey(node) {
        return getNodeKey(this.nodeKey, node.data);
      },

      getNodePath(data) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getNodePath');
        const node = this.store.getNode(data);
        if (!node) return [];
        const path = [node.data];
        let parent = node.parent;
        while (parent && parent !== this.root) {
          path.push(parent.data);
          parent = parent.parent;
        }
        return path.reverse();
      },

      getCheckedNodes(leafOnly, includeHalfChecked) {
        return this.store.getCheckedNodes(leafOnly, includeHalfChecked);
      },

      getCheckedKeys(leafOnly) {
        return this.store.getCheckedKeys(leafOnly);
      },

      getCurrentNode() {
        const currentNode = this.store.getCurrentNode();
        return currentNode ? currentNode.data : null;
      },

      getCurrentKey() {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in getCurrentKey');
        const currentNode = this.getCurrentNode();
        return currentNode ? currentNode[this.nodeKey] : null;
      },

      setCheckedNodes(nodes, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
        this.store.setCheckedNodes(nodes, leafOnly);
      },

      setCheckedKeys(keys, leafOnly) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedKeys');
        this.store.setCheckedKeys(keys, leafOnly);
      },

      setChecked(data, checked, deep) {
        this.store.setChecked(data, checked, deep);
      },

      getHalfCheckedNodes() {
        return this.store.getHalfCheckedNodes();
      },

      getHalfCheckedKeys() {
        return this.store.getHalfCheckedKeys();
      },

      setCurrentNode(node) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentNode');
        this.store.setUserCurrentNode(node);
      },

      setCurrentKey(key) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in setCurrentKey');
        this.store.setCurrentNodeKey(key);
      },

      getNode(data) {
        return this.store.getNode(data);
      },

      remove(data) {
        this.store.remove(data);
      },

      append(data, parentNode) {
        this.store.append(data, parentNode);
      },

      insertBefore(data, refNode) {
        this.store.insertBefore(data, refNode);
      },

      insertAfter(data, refNode) {
        this.store.insertAfter(data, refNode);
      },

      handleNodeExpand(nodeData, node, instance) {
        this.broadcast('ElTreeNode', 'tree-node-expand', node);
        this.$emit('node-expand', nodeData, node, instance);
      },

      updateKeyChildren(key, data) {
        if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
        this.store.updateChildren(key, data);
      },

      initTabIndex() {
        this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
        this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
        const checkedItem = this.$el.querySelectorAll('.is-checked[role=treeitem]');
        if (checkedItem.length) {
          checkedItem[0].setAttribute('tabindex', 0);
          return;
        }
        this.treeItems[0] && this.treeItems[0].setAttribute('tabindex', 0);
      },

      handleKeydown(ev) {
        const currentItem = ev.target;
        if (currentItem.className.indexOf('el-tree-node') === -1) return;
        const keyCode = ev.keyCode;
        this.treeItems = this.$el.querySelectorAll('.is-focusable[role=treeitem]');
        const currentIndex = this.treeItemArray.indexOf(currentItem);
        let nextIndex;
        if ([38, 40].indexOf(keyCode) > -1) { // up、down
          ev.preventDefault();
          if (keyCode === 38) { // up
            nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0;
          } else {
            nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0;
          }
          this.treeItemArray[nextIndex].focus(); // 选中
        }
        if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
          ev.preventDefault();
          currentItem.click(); // 选中
        }
        const hasInput = currentItem.querySelector('[type="checkbox"]');
        if ([13, 32].indexOf(keyCode) > -1 && hasInput) { // space enter选中checkbox
          ev.preventDefault();
          hasInput.click();
        }
      }
    },

    created() {
      debugger
      this.isTree = true;

      this.store = new TreeStore({
        key: this.nodeKey, // [String 默认undefined] 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
        data: this.data, // [Array 默认undefined] 展示数据
        lazy: this.lazy, // [Boolean 默认false] 是否懒加载子节点，需与 load 方法结合使用
        props: this.props, // [Object] 配置选项
        load: this.load, // [Function 默认undefined] 加载子树数据的方法，仅当 lazy 属性为true 时生效
        currentNodeKey: this.currentNodeKey, // [string, number 默认undefined] 当前选中的节点
        checkStrictly: this.checkStrictly, // [Boolean 默认undefined] 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false
        checkDescendants: this.checkDescendants, //  [Boolean 默认false] 是否检查后代
        defaultCheckedKeys: this.defaultCheckedKeys, // [Array 默认undefined] 默认勾选的节点的 key 的数组
        defaultExpandedKeys: this.defaultExpandedKeys, // [Array 默认undefined] 默认展开的节点的 key 的数组
        autoExpandParent: this.autoExpandParent, // [Boolean 默认true] 展开子节点的时候是否自动展开父节点
        defaultExpandAll: this.defaultExpandAll, // [Boolean 默认undefined] 是否默认展开所有节点
        filterNodeMethod: this.filterNodeMethod // [Function 默认undefined] 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏
      });

      this.root = this.store.root;

      let dragState = this.dragState;
      this.$on('tree-node-drag-start', (event, treeNode) => {
        if (typeof this.allowDrag === 'function' && !this.allowDrag(treeNode.node)) {
          event.preventDefault();
          return false;
        }
        event.dataTransfer.effectAllowed = 'move';

        // wrap in try catch to address IE's error when first param is 'text/plain'
        try {
          // setData is required for draggable to work in FireFox
          // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
          event.dataTransfer.setData('text/plain', '');
        } catch (e) {}
        dragState.draggingNode = treeNode;
        this.$emit('node-drag-start', treeNode.node, event);
      });

      this.$on('tree-node-drag-over', (event, treeNode) => {
        const dropNode = findNearestComponent(event.target, 'ElTreeNode');
        const oldDropNode = dragState.dropNode;
        if (oldDropNode && oldDropNode !== dropNode) {
          removeClass(oldDropNode.$el, 'is-drop-inner');
        }
        const draggingNode = dragState.draggingNode;
        if (!draggingNode || !dropNode) return;

        let dropPrev = true;
        let dropInner = true;
        let dropNext = true;
        let userAllowDropInner = true;
        if (typeof this.allowDrop === 'function') {
          dropPrev = this.allowDrop(draggingNode.node, dropNode.node, 'prev');
          userAllowDropInner = dropInner = this.allowDrop(draggingNode.node, dropNode.node, 'inner');
          dropNext = this.allowDrop(draggingNode.node, dropNode.node, 'next');
        }
        event.dataTransfer.dropEffect = dropInner ? 'move' : 'none';
        if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
          if (oldDropNode) {
            this.$emit('node-drag-leave', draggingNode.node, oldDropNode.node, event);
          }
          this.$emit('node-drag-enter', draggingNode.node, dropNode.node, event);
        }

        if (dropPrev || dropInner || dropNext) {
          dragState.dropNode = dropNode;
        }

        if (dropNode.node.nextSibling === draggingNode.node) {
          dropNext = false;
        }
        if (dropNode.node.previousSibling === draggingNode.node) {
          dropPrev = false;
        }
        if (dropNode.node.contains(draggingNode.node, false)) {
          dropInner = false;
        }
        if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
          dropPrev = false;
          dropInner = false;
          dropNext = false;
        }

        const targetPosition = dropNode.$el.getBoundingClientRect();
        const treePosition = this.$el.getBoundingClientRect();

        let dropType;
        const prevPercent = dropPrev ? (dropInner ? 0.25 : (dropNext ? 0.45 : 1)) : -1;
        const nextPercent = dropNext ? (dropInner ? 0.75 : (dropPrev ? 0.55 : 0)) : 1;

        let indicatorTop = -9999;
        const distance = event.clientY - targetPosition.top;
        if (distance < targetPosition.height * prevPercent) {
          dropType = 'before';
        } else if (distance > targetPosition.height * nextPercent) {
          dropType = 'after';
        } else if (dropInner) {
          dropType = 'inner';
        } else {
          dropType = 'none';
        }

        const iconPosition = dropNode.$el.querySelector('.el-tree-node__expand-icon').getBoundingClientRect();
        const dropIndicator = this.$refs.dropIndicator;
        if (dropType === 'before') {
          indicatorTop = iconPosition.top - treePosition.top;
        } else if (dropType === 'after') {
          indicatorTop = iconPosition.bottom - treePosition.top;
        }
        dropIndicator.style.top = indicatorTop + 'px';
        dropIndicator.style.left = (iconPosition.right - treePosition.left) + 'px';

        if (dropType === 'inner') {
          addClass(dropNode.$el, 'is-drop-inner');
        } else {
          removeClass(dropNode.$el, 'is-drop-inner');
        }

        dragState.showDropIndicator = dropType === 'before' || dropType === 'after';
        dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner;
        dragState.dropType = dropType;
        this.$emit('node-drag-over', draggingNode.node, dropNode.node, event);
      });

      this.$on('tree-node-drag-end', (event) => {
        const { draggingNode, dropType, dropNode } = dragState;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';

        if (draggingNode && dropNode) {
          const draggingNodeCopy = { data: draggingNode.node.data };
          if (dropType !== 'none') {
            draggingNode.node.remove();
          }
          if (dropType === 'before') {
            dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node);
          } else if (dropType === 'after') {
            dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node);
          } else if (dropType === 'inner') {
            dropNode.node.insertChild(draggingNodeCopy);
          }
          if (dropType !== 'none') {
            this.store.registerNode(draggingNodeCopy);
          }

          removeClass(dropNode.$el, 'is-drop-inner');

          this.$emit('node-drag-end', draggingNode.node, dropNode.node, dropType, event);
          if (dropType !== 'none') {
            this.$emit('node-drop', draggingNode.node, dropNode.node, dropType, event);
          }
        }
        if (draggingNode && !dropNode) {
          this.$emit('node-drag-end', draggingNode.node, null, dropType, event);
        }

        dragState.showDropIndicator = false;
        dragState.draggingNode = null;
        dragState.dropNode = null;
        dragState.allowDrop = true;
      });
    },

    mounted() {
      this.initTabIndex();
      this.$el.addEventListener('keydown', this.handleKeydown);
    },

    updated() {
      this.treeItems = this.$el.querySelectorAll('[role=treeitem]');
      this.checkboxItems = this.$el.querySelectorAll('input[type=checkbox]');
    }
  };
</script>
