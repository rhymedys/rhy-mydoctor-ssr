/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-17 09:20:21 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-17 09:45:37
 */


'use strict'

const Service = require('egg').Service;


class SessionService extends Service {

    /**
     * 获取数据库操作对象
     *
     * @return {Session} 数据库操作对象
     * @memberof SessionService
     */
    getSessionModel() {
        return this.ctx.model.Session;
    }

    /**
     * 插入数据到数据库,通过userId查找数据，如果存在更新，否则插入
     *
     * @param {*} sessionObj session对象
     * @return {Promise} 插入后的promise对象
     * @memberof SessionService
     */
    async insert(sessionObj) {
        if (sessionObj) {
            return this.getSessionModel()
                .findOneAndUpdate({
                    userId: sessionObj.userId
                }, sessionObj, {
                    upsert: true
                });
        }
        return Promise.reject(new Error('sessionObj 为空'));
    }

    /**
     * 通过userId 查找Session
     *
     * @param {*} userId userId 唯一
     * @return {Promise} 查找后Promise对象
     * @memberof SessionService
     */
    async findUserId(userId) {
        if (userId) {
            return this.getSessionModel()
                .findOne({
                    userId,
                });
        }

        return Promise.reject(new Error('userId 为空'));
    }

    /**
     * 通过sessionId 查找session信息
     *
     * @param {*} jSessionId session值
     * @return {Promise} 查找后promise对象
     * @memberof SessionService
     */
    async findByJSessionId(jSessionId) {
        if (jSessionId) {
            return this.getSessionModel()
                .findOne({
                    jSessionId,
                });
        }

        return Promise.reject(new Error('sessionId 为空'));
    }


    /**
     * 通过sessionId 删除session信息
     *
     * @param {*} jSessionId
     * @returns
     * @memberof SessionService
     */
    async deleteByJSessionId(jSessionId) {
        if (jSessionId) {
            return this.getSessionModel()
                .deleteOne({
                    jSessionId
                })
        }

        return Promise.reject(new Error('sessionId 为空'));

    }
}

module.exports = SessionService;