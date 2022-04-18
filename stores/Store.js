import { action, observable } from 'mobx'
import { inject, observer, enableStaticRendering } from 'mobx-react'
import { useMemo } from 'react'
import FilmsStore from './FilmsStore'
import RssSourcesStore from './RssSourcesStore'

//enableStaticRendering(typeof window === 'undefined')

let store

class Store {
  films = new FilmsStore()
  rssSources = new RssSourcesStore()
}

function initializeStore() {
  const _store = store ?? new Store()

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export function injectStore(component) {
  return inject("store")(observer(component))
}