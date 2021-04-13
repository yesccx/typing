<!-- 对战面板区 -->
<template>
    <el-card class="typing-pvp__main__classic-panel" shadow="always">
        <div class="play-info">
            <el-tag class="play-info__time">
                时间：<span class="value">{{ playInfo.inputTime }}</span>秒
            </el-tag>
            <el-tag class="play-info__speed" type="danger">
                速度：<span class="value">{{ playInfo.inputSpeed }}</span>字 / 分
            </el-tag>
            <el-tag type="success">
                <span class="play-info__progress">
                    完成度：<span class="value">{{ playInfo.progress }}</span>%（{{ playInfo.inputCount }} /
                    {{ playInfo.targetCount }}）
                </span>
                <el-progress status="success" class="play-info__progress-bar" :stroke-width="10" :percentage="playInfo.progress"
                    :show-text="false">
                </el-progress>
            </el-tag>
        </div>
    </el-card>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { calculatePlayInfo } from '@/views/typing/utils/typing-pvp-utils';

    export default {
        name: 'typing-pvp__main__classic-panel',
        inject: ['pvpController'],
        computed: {
            ...mapGetters('typingPvpPlayer', ['currentPlayer']),
            ...mapGetters('typingPvpContent', ['pvpContent']),
            ...mapGetters('typingPvpInformation', ['pvpInformation']),
            // 游戏进行中的信息
            playInfo() {
                return calculatePlayInfo(this.pvpInformation, this.pvpContent, this.currentPlayer);
            }
        },
        mounted() {
            this.pvpController.onPanelLoaded();
        },
        methods: {
            // 初始化
            init() { }
        }
    };
</script>

<style lang="scss">
    .typing-pvp__main__classic-panel {
        .el-card__body {
            padding: 15px;
        }

        .el-tag {
            margin: 0 5px;
        }

        .play-info {
            text-align: center;
            span.value {
                font-weight: bold;
                font-size: 14px;
                padding-right: 5px;
            }
            &__progress-bar {
                display: inline-flex;
                width: 200px;
                height: 9px;
            }
        }
    }
</style>