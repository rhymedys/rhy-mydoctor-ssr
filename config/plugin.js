/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-11-21 22:22:45 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-12 21:20:08
 */

'use strict';

// had enabled by egg
// exports.static = true;
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.view = {
    enable: true,
    package: 'egg-view',
};

exports.ejs = {
    enable: true,
    package: 'egg-view-ejs',
};