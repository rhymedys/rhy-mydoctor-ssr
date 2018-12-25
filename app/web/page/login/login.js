/*
 * @Author: Rhymedys/Rhymedys@gmail.com 
 * @Date: 2018-12-23 22:12:58 
 * @Last Modified by: Rhymedys
 * @Last Modified time: 2018-12-25 21:58:48
 */
import Vue from 'vue'
import {
    Button,
    Input
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
        onLoginClick() {
            
        }
    },
};