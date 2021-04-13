import Vue from 'vue';

export default new Vue({
    watch: {
        componentsLoadStatus: {
            handler(load) {
                if (load.player && load.workbench && load.panel) {
                    this.componentsLoaded();
                }
            },
            deep: true,
            immediate: true
        }
    },
    data() {
        return {
            loaded: false,
            componentsLoadStatus: {
                player: false,
                workbench: false,
                panel: false
            }
        };
    },
    methods: {
        // 初始化
        init() {
            this.$watch('loaded', (status) => {
                if (!status) {
                    return false;
                }

                // 通知子组件初始化
                this.$emit('init');
            }, { immediate: true });
        },
        // 标记所有组件加载完成
        componentsLoaded() {
            if (!this.componentsLoadStatus.all) {
                this.loaded = true;
            }
        },
        // 事件:组件player加载完成
        onPlayerLoaded() {
            this.componentsLoadStatus.player = true;
        },
        // 事件:组件workbench加载完成
        onWorkbenchLoaded() {
            this.componentsLoadStatus.workbench = true;
        },
        // 事件:组件panel加载完成
        onPanelLoaded() {
            this.componentsLoadStatus.panel = true;
        }
    }
});