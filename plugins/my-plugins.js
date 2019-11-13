import Vue from 'vue'
import VueSocketio from 'vue-socket.io';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(new VueSocketio({
  debug: true,
  connection: 'ws://101.132.116.167:8080' //地址+端口，由后端提供
}));

Vue.use(ElementUI)
