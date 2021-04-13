// 计算指定单位内的速率（默认：60秒）
export const calculateInputSpeed = (inputCount, startTime, endTime, unit = 60) => {
    return inputCount > 0 ? parseInt(inputCount / Math.max((endTime - startTime) / 1000 / unit, 0.02)) : 0;
};

// 计算完成度
export const calculateInputProgress = (targetCount, inputCount) => {
    return inputCount > 0 ? Math.min(parseInt(inputCount / targetCount * 100), 100) : 0;
};

// 计算进行时间（经过时间），结果单位：秒
export const calculateInputTime = (startTime, endTime) => {
    return Math.max(parseInt((endTime - startTime) / 1000), 0);
};

// 计算进行信息
export const calculatePlayInfo = (pvpInformation, pvpContent, playerInfo) => {
    const playInfo = {
        inputTime: 0,
        inputSpeed: 0,
        progress: 0,
        inputCount: 0,
        targetCount: 0
    };

    if (!pvpInformation || !pvpContent || !playerInfo) {
        return playInfo;
    }

    const targetCount = pvpContent.content.length;
    const inputCount = playerInfo.pvpInputCount;
    const startTime = playerInfo.pvpStartTime || 0;
    const endTime = playerInfo.pvpEndTime || pvpInformation.currentTime;

    if (startTime > 0) {
        playInfo.inputTime = calculateInputTime(startTime, endTime);
        playInfo.inputSpeed = calculateInputSpeed(inputCount, startTime, endTime);
        playInfo.progress = calculateInputProgress(targetCount, inputCount);
        playInfo.inputCount = inputCount;
    }
    playInfo.targetCount = targetCount;

    return playInfo;
};