/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 22:12:58 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2019-03-23 10:19:18
 */
import Vue from 'vue'
import {
    Button,
    Input,
    Message
} from 'element-ui';


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


            console.log('loginTime: start', new Date().getTime())

            if (id && password) {

                
                const loginInfoTxt = JSON.stringify({
                    id,
                    password
                })


                const  encrypt = new JSEncrypt();

                encrypt.setPublicKey(window.__INITIAL_STATE__.encryptKey);
                var encryptLoginInfo = encrypt.encrypt(loginInfoTxt);

                let info = encryptLoginInfo.toString()

                const {
                    data
                } = await this.$request.post(
                    'v2/login', {
                        info
                    },
                )
                if (!data || data.resultCode !== 0) {
                    Message.warning(data && data.resultDesc || '登录失败')
                } else {
                    console.log('loginTime:success   ', new Date().getTime())
                    this.redirectUrl()
                }
            }
        },
        async onTestLoginClick() {
            
            const {
                data
            } = await this.$request.post(
                'login', {
                    type:'test'
                },
            )

            if (!data || data.resultCode !== 0) {
                Message.warning(data && data.resultDesc || '登录失败')
            } else {
                console.log('loginTime:success   ', new Date().getTime())
                this.redirectUrl()
            }
        },


        redirectUrl() {
            let query = window.location.search.slice(1).split('&') || []

            if ((query = window.location.search.slice(1)) && (query = query.split('&')) && Array.isArray(query)) {
                const res = {}

                query.forEach(val => {
                    const kv = val.split('=')
                    res[kv[0]] = kv[1]
                })

                query = res
            }

            let redirectUrl = query['redirect_uri']

            if (redirectUrl) {
                redirectUrl = decodeURIComponent(redirectUrl)
                window.location.replace(redirectUrl)
            }
        }
    },
};