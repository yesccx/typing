import Axios from 'axios';
import Store from '@/store';
import Tip from '@/utils/tip';
import ResponseCode from '@/constants/common/response-code';
import { RouterLinkGuestLogin } from '@/router/kernel/router-links';
import * as Queue from '@/api/queue';

const service = Axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL || '',
    withCredentials: true,

    // 标识是否可以中断请求
    allowCancel: true,

    // 定义超时及重试
    maxRetry: 3,
    timeout: 8000,
    retryDelay: 2000,

    // 定义转换响应数据
    transformResponse(data) {
        data = JSON.parse(data);

        const responseStatus = { success: false, error: false, login: false };
        switch (data.code) {
            case ResponseCode.RESPONSE__SUCCESS:
                responseStatus.success = true;
                break;
            case ResponseCode.RESPONSE__ERROR:
                responseStatus.error = true;
                break;

            case ResponseCode.RESPONSE__LOGIN:
                responseStatus.login = true;
                break;
        }

        return {
            original: data,
            status: responseStatus,
            data: data.data,
            code: data.code,
            message: data.message
        };
    }
});

// 请求拦截器
service.interceptors.request.use(request => {
    // 处理loading动画
    handleAxiosLoading(request, true);

    // 添加auth请求头
    request.headers.Authorization = Store.getters['userSession/token'];

    // 请求入队
    return Queue.push(request);
}, error => Promise.reject(error));

// 响应拦截器
service.interceptors.response.use(
    response => {
        // 处理loading动画
        handleAxiosLoading(response.config, false);

        // 请求出队
        Queue.pop(response.config);

        // 提示未登录时，需要做特殊处理
        if (!response.config.ignoreAuth && response.status.login) {
            Store.dispatch('userSession/clearSession');
            RouterLinkGuestLogin();
        }

        // 发生错误时是否上报
        if (!response.data.status.success) {
            if (!response.config.reportError) {
                Tip.error(response.data.message || '未知错误');
                return new Promise(() => { });
            } else {
                return Promise.reject(response);
            }
        }

        return response.data;
    },
    error => {
        const originalRequest = error.config || null;

        // 处理请求被取消
        if (error instanceof Axios.Cancel) {
            return Promise.reject(error.message);
        }

        // 处理请求超时(尝试重新发起请求)
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
            return handleResponseTimeOut(error, originalRequest);
        }

        // 处理loading动画
        handleAxiosLoading(originalRequest, false);

        Queue.pop(originalRequest);

        // TODO: 这里可选是直接跳转到error页
        // FIXME: 待做成参数配置项，可选提示方式
        Tip.error('内部错误或网络异常');
        return Promise.reject(error);
    }
);

// 处理请求中时的loading行为
const handleAxiosLoading = (request, status = true) => {
    if (!request || !request.loading) {
        return false;
    } else if (status) {
        setTimeout(() => {
            request.loading && request.loading(true);
        }, 200);
    } else {
        request.loading(false);
        request.loading = false;
    }
};

// 处理请求超时(尝试重新发起请求)
const handleResponseTimeOut = (error, request) => {
    request._retryCount = request._retryCount || 0;
    if (request._retryCount >= request.maxRetry) {
        handleAxiosLoading(request, false);
        Tip.error('请求超时！请稍后重试');
        return Promise.reject(error);
    }

    request._retryCount += 1;
    console.warn(`${request.url}请求超时！正在第${request._retryCount}次重试请求`);

    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, request.retryDelay || 2000);
    }).then(() => service(request));
};

export default service;