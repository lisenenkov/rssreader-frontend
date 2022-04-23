import API from 'api/api'
import { action, flow, makeObservable, observable, onBecomeObserved, runInAction } from 'mobx'

class SelectedFilm {
  id = null
  filmInfo = {}
  loading = true
  error = null
  selectedLink = {}

  constructor() {
    makeObservable(this, {
      id: observable,
      filmInfo: observable,
      selectedLink: observable,
      loading: observable,
      error: observable,
      selectFilm: action,
      fetchFilmInfo: flow
    })
  }

  selectFilm = async (filmId) => {
    if (this.id == filmId)
      return;

    if (this.fetchFilmInfoActiveFlow != null)
      this.fetchFilmInfoActiveFlow.cancel()

    this.id = filmId
    this.fetchFilmInfoActiveFlow = this.fetchFilmInfo(filmId)
  }

  selectFilmLink = (filmLinkUrl) => {
    this.selectedLink = this.filmInfo.links.find(v => v.url === filmLinkUrl)
  }

  fetchFilmInfoActiveFlow = null
  fetchFilmInfo = function* (filmId) {
    try {
      this.loading = true
      const data = yield API.getFilm(filmId)
      runInAction(() => {
        this.filmInfo = data.film
        this.selectedLink = this.filmInfo.links[0]
        this.loading = false
      })
    } catch (error) {
    }
  }
}

class FilmsStore {
  selectedFilm = new SelectedFilm()

  list = []
  loading = false
  error = null

  constructor() {
    makeObservable(this, {
      selectedFilm: observable,
      list: observable,
      loading: observable,
      error: observable,
      fetchFilms: action,
      updateFilm: action,
      updateFilmLinks: action
    })
    onBecomeObserved(this, "list", this.fetchFilms)
  }

  fetchFilms = async () => {
    this.loading = true
    try {
      const data = await API.fetchFilms()
      runInAction(() => {
        this.list = data.films
        if (this.list.length > 0) {
          this.selectedFilm.selectFilm(this.list[0].id)
        }
        this.loading = false
        this.error = null
      })
    } catch (e) {
      this.loading = false
      this.error = e
    }
  }

  updateFilm = async (id, film) => {
    const data = await API.updateFilm(id, film)
    runInAction(() => {
      const newData = data.updateFilm
      const newDataIndex = this.list.findIndex(v => v.id === newData.id)
      if (newDataIndex >= 0)
        Object.assign(this.list[newDataIndex], newData)
      if (this.selectedFilm.id == newData.id)
        Object.assign(this.selectedFilm.filmInfo, newData)
    })
  }

  updateFilmLinks = async (linkIds, link) => {
    const data = await API.updateFilmLinks(linkIds, link)
    runInAction(() => {
      const newData = data.updateFilmLinks
      const links = this.selectedFilm.filmInfo.links;
      for (link of links) {
        Object.assign(link, newData.find(newLinkData => newLinkData.id === link.id && newLinkData.rssSource === link.rssSource));
      }
    })
  }

}

export default FilmsStore