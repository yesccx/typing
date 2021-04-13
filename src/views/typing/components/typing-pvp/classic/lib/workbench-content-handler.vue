<template>
    <div class="c-typing-pvp-main__classic-workbench__content-handler">
        <workbench-line ref="handler" :content="slicing.content"></workbench-line>
    </div>
</template>

<script>
    import WorkbenchLine from '@/views/typing/components/typing-pvp/classic/lib/workbench-line';

    export default {
        name: 'c-typing-pvp-main__classic-workbench__content-handler',
        props: {
            content: {
                type: String,
                default: ''
            },
            containerWidth: {
                type: Number,
                default: 1050
            }
        },
        data() {
            return {
                slicing: {
                    content: '',
                    step: 0,
                    maxLength: 1000
                },
                contentLines: []
            };
        },
        methods: {
            // 初始化
            async run() {
                console.time('content handler');
                await this.$nextTick();
                await this.handleContentSlice();
                console.timeEnd('content handler');
                return this.contentLines;
            },
            // 处理内容切片
            async handleContentSlice() {
                this.slicing.content = this.nextReadyContent();
                if (!this.slicing.content) {
                    return false;
                }

                // 递归切割到合适的位置
                await this.deepSlicing().then(() => {
                    this.saveCurrentSlice();
                });

                // 递归切分
                await this.handleContentSlice();
            },
            // 保存当前切片
            saveCurrentSlice() {
                // 切片内容保存
                this.contentLines.push(this.slicing.content);
                // 步长累加
                this.slicing.step += this.slicing.content.length;
                this.slicing.maxLength += this.slicing.step;
            },
            // 预取下一次准备切分的内容
            nextReadyContent() {
                return this.content.slice(this.slicing.step, this.slicing.maxLength);
            },
            // 递归切割内容至合适的长度
            async deepSlicing(offest = 0, offestAccuracy = 1, widthAccuracy = 1.2) {
                let $handler = this.$refs.handler.$refs['target-content'];
                let contentWidth = 0;
                let unitWidth = 0;
                let containerWidth = this.containerWidth;

                await this.$nextTick(() => {
                    console.log($handler);
                    contentWidth = $handler.scrollWidth;
                });
                if (contentWidth > containerWidth) {
                    // 预估出单个字符的宽度
                    unitWidth = contentWidth / this.slicing.content.length * widthAccuracy;
                    // 切割内容至合适的长度
                    this.slicing.content = this.slicing.content.slice(
                        0, offest - parseInt((contentWidth - containerWidth) / unitWidth)
                    );
                }

                // 结果长度还偏长时，需要再次切割
                let isNext = false;
                await this.$nextTick(() => {
                    isNext = $handler && $handler.scrollWidth > containerWidth;
                });
                if (isNext) {
                    await this.deepSlicing(offestAccuracy * -1, offestAccuracy, widthAccuracy);
                }
            }
        },
        components: {
            WorkbenchLine
        }
    };
</script>
