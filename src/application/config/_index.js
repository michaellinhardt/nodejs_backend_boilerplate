export * as encryption from './encryption.config'
export * as development from './development.config'
export * as production from './production.config'
export * as test from './test.config'

import { initConstantGlobaly } from './constants.config'

initConstantGlobaly()
