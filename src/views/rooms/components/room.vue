<template>
    <div>
        <el-card>
            <div slot="header">
                <span class="room-name">{{ room.name }}</span>
                <el-tag class="fr" type="info" size="mini"># {{ room.roomNo }}</el-tag>
            </div>
            <el-tag type="">创建人: {{ room.owner.nickname }}</el-tag>
            <el-tag type="">房间人数: {{ room.currentNumber }} / {{ room.maxNumber }}</el-tag>

            <el-button type="primary" class="join-room" plain>加入房间</el-button>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'view-rooms',
        props: {
            room: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
            };
        },
        methods: {
        }
    };
</script>

<style lang="scss" scoped>
    .room-name {
        font-weight: bold;
        color: $--color-primary-light-2;
    }

    .join-room {
        margin-top: 20px;
        display: inline-block;
        width: 100%;
    }

    .el-tag + .el-tag {
        margin-left: 5px;
    }
</style>