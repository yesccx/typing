<template>
    <div class="view-typing-pvp">
        <typing-pvp-main @hook:mounted="init" ref="main" />
    </div>
</template>

<script>
    export default {
        name: 'view-typing-pvp',
        data() {
            return {
                pvpId: 1,
                uid: 1,
                pvpPlayerIds: [1, 2, 3]
            };
        },
        mounted() {
            this.$socket.open();
            const uid = this.$route.query.uid;
            this.$socket.emit('join-room', { room: 'play', uid });

            this.$socket.on('join-room', (data) => {
                console.log(data);
            });
        },
        methods: {
            // 初始化pvp
            async init() {
                // 初始化pvp信息
                await this.initTypingPvp(this.pvpId);

                // 初始化pvp内容
                await this.initTypingPvpContent(1);

                // 初始化pvp所有参与者信息
                await this.initTypingPvpPlayer(this.pvpPlayerIds);

                await this.$refs.main.init();
            },
            // 初始化pvp
            async initTypingPvp(pvpId) {
                await this.$store.dispatch('typingPvpInformation/initInformation', { pvpId });
            },
            // 初始化pvp内容
            async initTypingPvpContent(contentId) {
                let content =
                    'Arch is a pragmatic distribution rather than an ideological one. The principles here' +
                    ' are only useful guidelines. Ultimately, design decisions are made on a case-by-case' +
                    ' basis through developer consensus. Evidence-based technical analysis and debate are' +
                    ' what matter, not politics or popular opinion.' +
                    'The large number of packages and build scripts in the various Arch Linux repositories' +
                    ' offer free and open source software for those who prefer it, as well as proprietary' +
                    ' software packages for those who embrace functionality over ideology.';

                content = content.replace(/(?:(\s)+)/g, '$1');
                await this.$store.dispatch('typingPvpContent/initContent', { contentId: 1, content });
            },
            // 初始化pvp所有参与者信息
            async initTypingPvpPlayer(pvpPlayerIds = []) {
                const players = [
                    { uid: 1, uname: '张三', uavatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
                    { uid: 2, uname: '李四', uavatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' },
                    { uid: 3, uname: 'yesc', uavatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png' }
                ];
                await this.$store.dispatch('typingPvpPlayer/initPlayers', players);
            }
        },
        sockets: {
            play(data) {
                this.$store.commit('typingPvpPlayer/setPlayerPvpInputCount', {
                    uid: data['uid'],
                    count: data['count']
                });
            },
            'start-play'(data) {
                this.$store.commit('typingPvpPlayer/setPlayerPvpStartTime', {
                    uid: data['uid'],
                    time: data.time
                });
            }
        },
        components: {
            'typing-pvp-main': () => import('@/views/typing/components/typing-pvp/main')
        }
    };
</script>