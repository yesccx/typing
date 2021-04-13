<template>
    <div class="typing-pvp__main__classic-player">
        <el-scrollbar>
            <el-card shadow="always" class="player-card" v-for="player in playerCollection" :key="player.uid">
                <player-line :player="player" />
            </el-card>
        </el-scrollbar>
    </div>
</template>

<script>
    import PlayerLine from './lib/player-line';
    import { mapState } from 'vuex';

    export default {
        name: 'typing-pvp__main__classic-player',
        inject: ['pvpController'],
        computed: {
            ...mapState('typingPvpPlayer', ['playerCollection'])
        },
        date() {
            return {};
        },
        mounted() {
            this.pvpController.onPlayerLoaded();
        },
        components: {
            PlayerLine
        }
    };
</script>

<style lang="scss">
    .typing-pvp__main__classic-player {
        .player-card {
            width: 90%;
            margin: 15px auto;
        }

        > .el-scrollbar {
            height: 50vh;
        }
    }
</style>
