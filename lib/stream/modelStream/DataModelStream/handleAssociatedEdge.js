import extend from 'xtend'
import {
  actionType, target
}
from '../../const'

let handelers = {}
handelers[actionType.HOVER] = search
handelers[actionType.UNHOVER] = search

export default function(edges, nodes, action, push) {
  if (handelers[action.type])
    handelers[action.type](edges, nodes, action, push)
}

function search(edges, nodes, action, push) {
  let es = edges.arms(action.id)

  es.forEach(e => push(extend(e, {
    target: target.VIEW_EDGE
  })))
}
