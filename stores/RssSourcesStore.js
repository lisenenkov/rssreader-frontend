import API from 'api/api'
import { action, makeObservable, observable, onBecomeObserved, runInAction } from 'mobx'

class RssSourcesStore {
  list = []
  loading = false
  error = null

  constructor() {
    makeObservable(this, {
      list: observable,
      loading: observable,
      error: observable,
      fetchRssSources: action,
      createRssSource: action,
      updateRssSource: action,
      deleteRssSource: action,
    })
    onBecomeObserved(this, "list", this.fetchRssSources)
  }

  fetchRssSources = async () => {
    this.loading = true
    try {
      const data = await API.fetchRssSources()
      runInAction(() => {
        this.list = data.rssSources
        this.loading = false
        this.error = null
      })
    } catch (e) {
      this.loading = false
      this.error = e
    }
  }

  createRssSource = async (rssSource) => {
    const data = await API.createRssSource(rssSource)
    runInAction(() => {
      const newData = data.createRssSource
      this.list.push(newData)
    })
  }

  updateRssSource = async (id, rssSource) => {
    const data = await API.updateRssSource(id, rssSource)
    runInAction(() => {
      const newData = data.updateRssSource
      const newDataIndex = this.list.findIndex(v => v.id == newData.id)
      if (newDataIndex >= 0)
        Object.assign(this.list[newDataIndex], newData)
    })
  }

  deleteRssSource = async (id) => {
    const data = await API.deleteRssSource(id)
    runInAction(() => {
      const newData = data.deleteRssSource
      const deleteDataIndex = this.list.findIndex(v => v.id == newData.id)
      if (deleteDataIndex >= 0)
        this.list.splice(deleteDataIndex, 1)
    })
  }

}

export default RssSourcesStore