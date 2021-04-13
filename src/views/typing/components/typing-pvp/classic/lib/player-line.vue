<template>
    <div class="c-typing-pvp-main__classic-player__line">
        <div class="player-info">
            <el-avatar class="player-info__avatar" :size="30" :src="player.uavatar"></el-avatar>
            <span class="player-info__name">{{ player.uname }}</span>
            <div class="player-info__panel">
                <span class="speed">{{ playInfo.inputSpeed }}</span> 字 / 分
            </div>
        </div>
        <el-progress class="player-progress" :text-inside="true" :stroke-width="17" :percentage="playInfo.progress">
        </el-progress>
        <el-divider></el-divider>
        <div class="player-connect">
            <el-tag type="success" size="mini" class="player-connect__ping">在线 20ms</el-tag>
        </div>
    </div>
</template>

<script>
    import { calculatePlayInfo } from '@/views/typing/utils/typing-pvp-utils';
    import { mapGetters } from 'vuex';

    export default {
        name: 'c-typing-pvp-main__classic-player__line',
        props: {
            player: {
                type: Object,
                required: true
            }
        },
        computed: {
            ...mapGetters('typingPvpContent', ['pvpContent']),
            ...mapGetters('typingPvpInformation', ['pvpInformation']),
            // 游戏进行中的信息
            playInfo() {
                return calculatePlayInfo(this.pvpInformation, this.pvpContent, this.player);
            }
        }
    };
</script>

<style lang="scss">
    .player-info {
        display: flex;
        align-items: center;

        &__avatar {
            margin-right: 10px;
        }

        &__name {
            display: block;
            text-align: left;
            font-size: 14px;
            // color: $--color-primary-light-4;
            font-weight: bold;
        }

        &__panel {
            font-size: 14px;
            // color: $--color-primary-light-4;
            margin-left: auto;
            font-weight: bold;

            .speed {
                // color: $--color-primary-light-2;
                font-size: 16px;
            }
        }
    }

    .player-progress {
        margin-top: 15px;
    }

    .player-connect {
        display: flex;
        margin-top: -5px;

        &__ping {
            font-size: 10px;
            font-weight: bold;
        }
    }
</style>