/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-17 09:35:40 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-17 10:53:06
 */


'use strict'

const jSessionKey = 'JSESSIONID'

function getJSessionIdFromCookies(ctx) {
    return ctx && ctx.cookies.get(jSessionKey)
}

function setJSessionIdToCookies(ctx, JSessionId) {
    return ctx && JSessionId && ctx.cookies.set(jSessionKey, JSessionId);
}
async function getDBJSessionInfoByJSessionId(ctx, JSessionId) {
    return ctx && JSessionId && ctx.service.session.findByJSessionId(JSessionId)
}

async function getDBJSessionInfoByCookiesJSession(ctx) {
    const JSessionId = getJSessionIdFromCookies(ctx)
    return ctx && JSessionId && ctx.service.session.findByJSessionId(JSessionId)
}

async function deleteJSessionByCookieJSession(ctx) {
    const JSessionId = getJSessionIdFromCookies(ctx)
    return ctx && JSessionId && ctx.service.session.deleteByJSessionId(JSessionId)
}

module.exports = {
    getJSessionIdFromCookies,
    setJSessionIdToCookies,
    getDBJSessionInfoByJSessionId,
    getDBJSessionInfoByCookiesJSession,
    deleteJSessionByCookieJSession
};