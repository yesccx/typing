<template>
    <div class="view-rooms">
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card style="margin-bottom: 20px;">
                    <el-button @click="onCreateRoom" type="primary" class="join-room" plain>创建房间</el-button>
                    <el-button type="primary" class="join-room" plain>加入房间</el-button>
                </el-card>
            </el-col>
            <el-col v-for="room in rooms" :key="room.id" :span="8">
                <room :room="room"></room>
            </el-col>
        </el-row>

        <c-room-modal :visible.sync="roomModal.visible" />
    </div>
</template>

<script>
    export default {
        name: 'view-rooms',
        data() {
            return {
                rooms: [],
                roomModal: {
                    visible: false
                }
            };
        },
        created() {
        },
        mounted() {
            this.initRooms();
        },
        methods: {
            // 初始化房间列表
            initRooms() {
                this.rooms.push({
                    id: 1,
                    name: '房间1',
                    roomNo: '20210101',
                    currentNumber: 1,
                    maxNumber: 4,
                    owner: {
                        id: 1,
                        nickname: '张三'
                    }
                });
                this.rooms.push({
                    id: 2,
                    name: '房间2',
                    roomNo: '63210509',
                    currentNumber: 2,
                    maxNumber: 2,
                    owner: {
                        id: 2,
                        nickname: '王五'
                    }
                });
            },
            // 事件: 创建房间
            onCreateRoom() {
                this.roomModal.visible = true;
            }
        },
        components: {
            'room': () => import('@/views/rooms/components/room'),
            'c-room-modal': () => import('@/views/rooms/components/room-modal')
        }
    };
</script>

<style lang="scss" scoped>
    .view-rooms {
        padding: 20px;
    }
</style>