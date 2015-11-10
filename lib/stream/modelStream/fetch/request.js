import superagent from 'superagent'
import pify from 'superagent-promise'

export default pify(superagent, Promise)
