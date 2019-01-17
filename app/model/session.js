/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2019-01-17 09:13:54 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-17 09:21:14
 */

'use strict'

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const SessionSchema = new Schema({
        jSessionId: {
            type: String,
            required: true
        },
        userId: {
            type: Number,
            required: true,
            unique: true,
        },
    });

    return mongoose.model('Session', SessionSchema);
}