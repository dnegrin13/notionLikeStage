import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { RiAddFill, BiTrash, GiTransform, BiArrowRightShort} from "oh-vue-icons/icons";
addIcons( RiAddFill, BiTrash, GiTransform, BiArrowRightShort);

createApp(App).component("v-icon", OhVueIcon).mount('#app')

