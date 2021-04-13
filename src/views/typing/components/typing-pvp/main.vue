<template>
    <div class="typing-pvp__main">
        <el-container>
            <!-- 对战成员区 -->
            <el-aside width="280px">
                <main-player ref="player" class="main-player" />
            </el-aside>

            <el-container>
                <!-- 对战面板区 -->
                <el-header>
                    <main-panel ref="panel" class="main-panel" />
                </el-header>

                <!-- 对战工作台区 -->
                <el-main>
                    <main-workbench ref="workbench" class="main-workbench" @play="onPlay" @start-play="onStartPlay"
                        @end-play="onEndPlay" />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import pvpController from '@/views/typing/components/typing-pvp/utils/pvp-controller';

    export default {
        name: 'typing-pvp__main',
        provide() {
            return { pvpController };
        },
        computed: {
            ...mapGetters('typingPvpPlayer', ['currentPlayer'])
        },
        methods: {
            // pvp入口初始化
            async init(typingPvp) {
                pvpController.init();
            },
            // 事件：初始化输入
            onInitPlay() {
                this.initPlay();
            },
            // 事件：输入内容更新
            onPlay(content) {
                this.$store.commit('typingPvpPlayer/setPlayerPvpInputCount', {
                    uid: this.currentPlayer.uid,
                    count: content.length
                });
                const uid = this.$route.query.uid;
                this.$socket.emit('play', JSON.stringify({
                    uid,
                    room_id: 'play',
                    count: content.length
                }));
            },
            // 事件：开始输入
            onStartPlay() {
                const startTime = Date.now();
                this.$store.commit('typingPvpPlayer/setPlayerPvpStartTime', {
                    uid: this.currentPlayer.uid,
                    time: startTime
                });
                this.$notify({ title: '提醒', message: '游戏开始', type: 'success' });

                const uid = this.$route.query.uid;
                this.$socket.emit('start-play', JSON.stringify({
                    uid,
                    room_id: 'play',
                    time: startTime
                }));
            },
            // 事件：结束输入
            onEndPlay() {
                this.$store.commit('typingPvpPlayer/setPlayerPvpEndTime', {
                    uid: this.currentPlayer.uid
                });
                this.$notify({ title: '提醒', message: '游戏结束', type: 'success' });
            }
        },
        components: {
            'main-panel': () => import('@/views/typing/components/typing-pvp/classic/panel'),
            'main-player': () => import('@/views/typing/components/typing-pvp/classic/player'),
            'main-workbench': () => import('@/views/typing/components/typing-pvp/classic/workbench')
        }
    };
</script>

<style lang="scss">
    .el-divider--horizontal {
        margin: 15px 0;
    }

    .el-divider {
        background-color: #f2f2f2 !important;
    }
</style>