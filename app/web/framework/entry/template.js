import Layout from 'component/layout/index';
import Login from 'component/layout/login'
import plugin from 'framework/plugin';

export default function(Vue) {
  Vue.use(plugin);
  Vue.component(Layout.name, Layout);
  Vue.component(Login.name,Login)
}