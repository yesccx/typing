/*
 * 数据持久化store工具类
 *
 * @Created: 2021-03-27 12:28:43
 * @Author: yesc (yes.ccx@gmail.com)
 */

import dayjs from 'dayjs';

/** @const {Object} 可用的缓存键 */
export const KEYS = {
    USER_SESSION: 'user_session',
    USER_SESSION_CONFIG: 'user_session_config'
};

class DataStore {
    /**
     * 存储驱动对象，需要实现（getItem、setItem、removeItem）方法
     * @type {localStorage|Object}
     */
    _driver = null;

    /**
     * 缓存前缀
     * @type {String}
     */
    _prefix = 'vue';

    /**
     * 获取和存储
     *
     * @param {String} key 缓存键
     * @param {Function} callable
     * @param {Number} [ttl=-1] 缓存有效秒数，默认为永久
     * @return {Any} 缓存值
     */
    remember(key, callable, ttl = -1) {
        if (this.has(key)) {
            return this.get(key);
        }

        const value = callable();
        this.put(key, value, ttl);

        return value;
    }

    /**
     * 存储缓存
     *
     * @param {String} key 缓存键
     * @param {Any} value 缓存值
     * @param {Number} [ttl=-1] 缓存有效秒数，默认为永久
     * @return {Boolean} true为缓存成功,false为失败
     */
    put(key, value, ttl = -1) {
        if (typeof value === 'function') {
            value = value();
        }

        // 过期时间
        const expireTime = ttl >= 0 ? dayjs().add(ttl, 'second').unix() : -1;

        try {
            value = btoa(encodeURIComponent(JSON.stringify({ expire_time: expireTime, data: value })));
            this._getDriver().setItem(this._key(key), value);
        } catch (error) {
            return false;
        }
        return true;
    }

    /**
     * 获取缓存
     *
     * @param {String} key 缓存键
     * @param {Any} [defaultValue=null] 默认值
     * @return {Any} 缓存值
     */
    get(key, defaultValue = null) {
        let value = this._getDriver().getItem(this._key(key));
        if (value === null) {
            return defaultValue;
        }

        try {
            value = JSON.parse(decodeURIComponent(atob(value)));
            if (Number.isNaN(value.expire_time) || !value.hasOwnProperty('data')) {
                throw new Error(`缓存${key}无效`);
            } else if (value.expire_time >= 0 && value.expire_time < dayjs().unix()) {
                throw new Error(`缓存${key}已失效`);
            }
            value = value.data;
        } catch (error) {
            console.error(error);
            return defaultValue;
        }

        return value;
    }

    /**
     * 移除缓存
     *
     * @param {String} key 缓存键
     * @return {Boolean} true为成功,false为失败
     */
    forget(key) {
        this._getDriver().removeItem(this._key(key));
        return true;
    }

    /**
     * 清空缓存
     *
     * @return {Boolean} true为成功,false为失败
     */
    flush() {
        this._getDriver().clear();
        return true;
    }

    /**
     * 判断缓存是否存在
     *
     * @param {String} key 缓存键
     * @return {Boolean} true为成功,false为失败
     */
    has(key) {
        return this.get(key, '__IS_NULL__') !== '__IS_NULL__';
    }

    /**
     * 构建key名
     *
     * @param {String} originalKey 原始key名
     * @return {String} 带前缀的key名
     */
    _key(originalKey) {
        return this._prefix + originalKey;
    }

    /**
     * 设置缓存前缀
     *
     * @param {String} [prefix=''] 缓存前缀
     * @return {DataStore}
     */
    setPrefix(prefix = '') {
        this._prefix = prefix || '';
        return this;
    }

    /**
     * 设置储存驱动对象
     *
     * @param {localStorage|Object} driver
     * @return {DataStore}
     */
    setDriver(driver) {
        this._driver = driver;
        return this;
    }

    /**
     * 获取缓存驱动对象
     *
     * @return {localStorage|Object}
     */
    _getDriver() {
        return this._driver;
    }
}

export default new DataStore()
    .setDriver(window.localStorage)
    .setPrefix('__typing__');