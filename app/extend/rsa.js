/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-16 15:32:23 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-16 16:19:23
 */
'use strict';
const NodeRSA = require('node-rsa');

const keyData = new NodeRSA({
    b: 512
});

// 公钥
const publicKey = keyData.exportKey('pkcs8-public');
// 私钥
const privateKey = keyData.exportKey('pkcs8-private');

module.exports = {
    publicKey,
    privateKey
}