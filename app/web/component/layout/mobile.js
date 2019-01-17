import Vue from 'vue';

export default function createLayout(name, components, tpl) {
  return {
    name,
    props: ['title', 'description', 'keywords', 'mobile'],
    components,
    computed: {
      vTitle() {
        return this.$root.title || this.title || 'rhymedys_home';
      },
      vKeywords() {
        return this.$root.keywords || this.keywords || 'rhymedys home';
      },
      vDescription() {
        return this.$root.description || this.description || 'rhymedys_home';
      },
      vEncryptKey(){
        return this.$root.encryptKey || ''
      },
      baseClass() {
        return this.$root.baseClass;
      }
    },
    template: EASY_ENV_IS_BROWSER ? tpl : `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <title>{{vTitle}}</title>
                      <meta charset="utf-8">
                      <meta http-equiv="X-UA-Compatible" content="IE=edge">
                      <meta name="keywords" :content="vKeywords">
                      <meta name="description" :content="vDescription">
                      <meta http-equiv="content-type" content="text/html;charset=utf-8">
                      <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
                      <!-- Add to home screen for Windows -->
                      <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
                      <meta name="msapplication-TileColor" content="#2F3BA2">
                      <!-- Add to home screen for Safari on iOS -->
                      <meta name="apple-mobile-web-app-capable" content="yes">
                      <meta name="apple-mobile-web-app-status-bar-style" content="black">
                      <meta name="apple-mobile-web-app-title" content="Weather PWA">
                      <link rel="apple-touch-icon" href="/logo.png">
                      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
                      <script type="text/javascript" src="http://120.79.205.36:3001/lib/js/dpr.js"/>
                      </head>
                    <body :class="baseClass">
                      ${tpl}
                    </body>
                  </html>`,
    install(vue, options) {
      //
    }
  };
}