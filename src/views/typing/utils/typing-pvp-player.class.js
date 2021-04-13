export default class TypingPvpPlayerClass {
    // 用户id
    uid = 0;

    // 用户名称
    uname = '';

    // 用户头像
    uavatar = '';

    // 用户信息
    uinfo = {};

    // pvp开始时间
    pvpStartTime = 0;

    // pvp结束时间
    pvpEndTime = 0;

    // 错误字索引集
    pvpErrorIndexCollection = [];

    // 已输入字数
    pvpInputCount = 0;

    constructor(playerInfo) {
        this.uid = playerInfo.uid || 0;
        this.uname = playerInfo.uname || '';
        this.uavatar = playerInfo.uavatar || '';
        this.uinfo = playerInfo;
    }

    toObject() {
        return JSON.parse(JSON.stringify(this));
    }
};