/*
 * 这里的队列主要用于请求唯一化
 * PS: 防止同一个请求被同时处理
 *
 * @Created: 2021-04-12 14:52:12
 * @Author: yesc (yes.ccx@gmail.com)
 */

import Axios from 'axios';
import md5 from 'md5';
import _ from 'lodash';

const requestQueue = {};

// 开始请求
export const push = (request) => {
    // 根据请求体生成请求唯一标识
    const requestUUID = md5({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data
    });

    // 判断是否有正在进行中的相同请求，存在时中断这些旧请求
    if (requestQueue[requestUUID] !== undefined) {
        close(requestUUID, '重复请求');
    }

    // 生成cancelToken(用于中断)
    const source = Axios.CancelToken.source();
    request.cancelToken = source.token;
    request.requestUUID = requestUUID;

    // 入队
    requestQueue[requestUUID] = {
        cancel: source.cancel,
        allowCancel: request.allowCancel
    };

    return request;
};

// 完成请求
export const pop = (request) => {
    close(request.requestUUID, '完成');
};

// 中断所有请求
export const closeAll = (message = '') => {
    _.forEach(requestQueue, (data, requestUUID) => {
        close(requestUUID, message);
    });
};

// 中断请求
export const close = (requestUUID, message = '') => {
    requestQueue[requestUUID].cancel(message);
    delete requestQueue[requestUUID];
};