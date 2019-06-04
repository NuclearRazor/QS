// include Vue and home component
var Vue = require('vue');
var MainView = require('./components/view.vue');
var VueResource = require('vue-resource');

Vue.use(VueResource);

new Vue({
    el: '#app',
    render: function (createElement) {
        return createElement(MainView);
    },
});