import './js/weapp-adapter/index.js'
import './js/symbol.js'
import Events from './js/minivents.min.js'

GameGlobal.events = new Events()

import Main from './js/main'

new Main()
