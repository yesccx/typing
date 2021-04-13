<!-- 对战工作台区 -->
<template>
    <el-card class="c-typing-pvp-main__classic-workbench" shadow="always">
        <!-- 内容处理器（仅初始化使用） -->
        <workbench-content-handler v-if="!inited" ref="contentHandler" :content="playContent" :container-width="containerWidth" />

        <!-- 内容行 -->
        <workbench-line ref="workbench-line" v-for="(lineContent, lineIndex) in targetLines" @input="onPlayLineInput"
            :enabled="playInfo.lineIndex==lineIndex" :content="lineContent" :line-index="lineIndex" :key="lineIndex" />
    </el-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import WorkbenchLine from './lib/workbench-line';
    import WorkbenchContentHandler from './lib/workbench-content-handler';

    export default {
        name: 'c-typing-pvp-main__classic-workbench',
        inject: ['pvpController'],
        props: {
            containerWidth: {
                type: Number,
                default: 1050
            }
        },
        computed: {
            ...mapGetters('typingPvpContent', ['pvpContent']),
            playContent() {
                return this.pvpContent.content || '';
            }
        },
        data() {
            return {
                targetLines: [],
                inputLines: [],
                playInfo: {
                    lineIndex: 0,
                    maxLineIndex: 0
                },
                isStart: false,
                inited: false
            };
        },
        mounted() {
            this.pvpController.$on('init', () => {
                this.init();
            });

            this.pvpController.onWorkbenchLoaded();
        },
        methods: {
            // 初始化
            async init() {
                // 处理内容，切分成多行
                this.targetLines = await this.$refs.contentHandler.run();
                this.playInfo.maxLineIndex = this.targetLines.length - 1;

                // 首行输入区获得焦点
                this.startCompleteLine(0, '');

                this.inited = true;
            },
            // 更新输入行内容，并重新计算完成度
            updateInputLine(lineIndex, lineContent, computed = true) {
                this.inputLines[lineIndex] = lineContent;
                this.$emit('play', this.inputLines.join(''));

                if (computed) {
                    this.computedInputDegree();
                }
            },
            // 计算输入行的进度
            computedInputDegree() {
                const currentLine = this.playInfo.lineIndex;
                const inputCotnent = this.inputLines[currentLine];
                const targetContent = this.targetLines[currentLine];

                // 已输入内容符合完成时，开始下一行
                if (inputCotnent.indexOf(targetContent) === 0 ||
                    (inputCotnent.length >= targetContent.length && inputCotnent.slice(-1) === targetContent.slice(-1))) {
                    this.playInfo.lineIndex += 1;

                    // 标记完成行
                    this.finalCompleteLine(currentLine, inputCotnent.slice(0, targetContent.length));

                    // 截取溢出部分，开始下一行
                    this.startCompleteLine(this.playInfo.lineIndex, inputCotnent.slice(targetContent.length));
                }
            },
            // 标记开始下一行
            startCompleteLine(lineIndex, initContent) {
                // 通报结束游戏
                if (lineIndex > this.playInfo.maxLineIndex) {
                    this.$emit('end-play');
                } else {
                    this.updateInputLine(lineIndex, initContent, false);
                    this.$nextTick(() => {
                        this.$refs['workbench-line'][lineIndex].start(initContent);
                    });
                }
            },
            // 标记完成行
            finalCompleteLine(lineIndex, finalContent) {
                this.updateInputLine(lineIndex, finalContent, false);
                this.$refs['workbench-line'][lineIndex].final(finalContent);
            },
            // 事件：行内容输入
            onPlayLineInput(inputContent, lineContent, lineIndex) {
                // 通报开始游戏
                if (this.isStart === false) {
                    this.isStart = true;
                    this.$emit('start-play');
                }

                if (this.playInfo.lineIndex >> 0 === lineIndex) {
                    this.updateInputLine(lineIndex, lineContent);
                }
            }
        },
        components: {
            WorkbenchLine,
            WorkbenchContentHandler
        }
    };
</script>
