/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-24 20:44:14 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-24 22:49:02
 */

import createLayout from '../mobile';
import '../../../asset/css/global.css'
import '../../../asset/css/login.less'
export default createLayout('login-layout', {}, '<div id="app"><slot></slot></div>');
