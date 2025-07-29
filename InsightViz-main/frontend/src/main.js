import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import './style.css'

// 🔽 Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {
  faChartLine,
  faUser,
  faClipboardList,
  faCheckCircle,
  faBullhorn,
  faUserCheck,
  faBell
} from '@fortawesome/free-solid-svg-icons'

// 🔽 Ajouter les icônes dans la librairie
library.add(
  faChartLine,
  faUser,
  faClipboardList,
  faCheckCircle,
  faBullhorn,
  faUserCheck,
  faBell,
  faSearch,
)

// 🔽 Création de l'app
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon) // register globally
app.use(router)
app.mount('#app')
