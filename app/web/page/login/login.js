/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 22:12:58 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-01-16 17:11:39
 */
import Vue from 'vue'
import {
    Button,
    Input,
    Message
} from 'element-ui';
import aes from "crypto-js/aes";

Vue.component(Button.name, Button);
Vue.component(Input.name, Input);

export default {
    name: "login",
    data() {
        return {
            id: '',
            password: ''
        }
    },
    computed: {
        computeBtnDisabled() {
            const {
                id,
                password
            } = this

            return !id || !password
        }
    },

    methods: {
        async onLoginClick() {
            let {
                id,
                password
            } = this

            id = id.trim()
            password = password.trim()

            if (id && password) {

                const loginInfoTxt = JSON.stringify({
                    id,
                    password
                })

                const encryptLoginInfo = aes.encrypt(
                    loginInfoTxt,
                    window.location.href
                )

                let info = encryptLoginInfo.toString()

                const {
                    data
                } = await this.$request.post(
                    'login', {
                        info
                    },
                )
                if (!data || data.resultCode !== 0) {
                    Message.warning(data && data.resultDesc || '登录失败')
                }


            } else {

            }
        }
    },
};