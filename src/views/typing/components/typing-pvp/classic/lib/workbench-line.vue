<template>
    <div class="c-typing-pvp-main__classic-workbench__line">
        <div class="typing-line-container">
            <!-- 对照内容区（目标区） -->
            <div class="target-line">
                <p class="line-content" ref="target-content">
                    <span v-for="(unit, index) in followContentUnits" :key="index" class="target-line__unit"
                        :class="'unit-status-' + unit.status">{{ unit.text }}</span>
                </p>
            </div>
            <!-- 输入区 -->
            <div class="workbench-line">
                <p ref="workbench-content" class="line-content">
                    <input ref="input" v-model="inputContent" :disabled="!inputEnabled" @input="onInput"
                        class="workbench-line__input" tabindex="1" type="text" />
                </p>
            </div>
            <!-- 统计区 -->
            <el-divider content-position="left">
                <i v-show="followError.count > 0" class="el-icon-error cr-danger"> {{ followError.count }}个错误</i>
            </el-divider>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'c-typing-pvp-main__classic-workbench__line',
        props: {
            content: {
                type: String,
                default: ''
            },
            lineIndex: {
                type: Number,
                default: 0
            },
            enabled: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            content: {
                handler(val) {
                    this.targetContent = val;
                },
                immediate: true
            }
        },
        computed: {
            // 当前内容单元
            followContentUnits() {
                const inputContentUnits = this.inputContent.split('');
                const targetContentUnits = this.targetContent.split('');

                // 逐个对比，标记是否正确
                return targetContentUnits.map((unitText, index) => ({
                    text: unitText,
                    status: inputContentUnits[index] !== undefined ? (
                        inputContentUnits[index] !== unitText ? 2 : 1
                    ) : 0
                }));
            },
            // 当前内容单元错误统计
            followError() {
                const errorCount = this.followContentUnits.filter((unit) => (unit.error)).length;
                return {
                    count: errorCount
                };
            },
            // 当前是否可允许输入
            inputEnabled() {
                return !this.isFinal && this.enabled;
            }
        },
        data() {
            return {
                inputContent: '',
                targetContent: '',
                disabled: true,
                isStart: false,
                isFinal: false
            };
        },
        methods: {
            // 事件：输入中
            onInput(e) {
                if (this.isFinal) {
                    return false;
                }
                this.$emit('input', e.data, this.inputContent, this.lineIndex >> 0);
            },
            // 标记开始
            start(initContent = '') {
                this.inputContent = initContent;
                this.isStart = true;

                this.$nextTick(() => {
                    this.$refs.input.focus();
                });
            },
            // 标记结束
            final(finalContent) {
                this.isStart = false;
                this.isFinal = true;
                this.inputContent = finalContent;
            }
        }
    };
</script>

<style lang="scss" scoped>
    @mixin view-line {
        padding: 0 5px;
        text-align: left;
    }

    @mixin content-font-style {
        font-weight: bold;
        letter-spacing: 0.5px;
        font-family: "Source Code Pro";
        line-height: 25px;
        font-size: 17px;
    }

    .typing-line-container {
        position: relative;
    }

    .target-line {
        @include view-line;
        color: $--color-primary-light-7;
        p.line-content {
            width: auto;
            display: inline-block;
        }

        &__unit {
            &.unit-status-0 {
                color: $--color-primary-light-7;
            }
            &.unit-status-1 {
                color: $--color-primary-light-1;
            }
            &.unit-status-2 {
                background: $--color-danger;
                color: #fff;
            }
        }
    }

    .workbench-line {
        margin-top: 8.5px;

        &__input {
            @include content-font-style;
            // color: $--color-primary-light-1;
            width: 99%;
            border: 0;
            background: #f2f2f2;
            padding: 5px;

            &:focus {
                outline: none;
            }
        }
    }

    .line-content {
        @include content-font-style;
        margin: 0;
        padding: 0;
        white-space: pre;
        width: 100%;
        overflow: hidden;
    }
</style>
