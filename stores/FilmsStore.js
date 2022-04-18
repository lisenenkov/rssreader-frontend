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
    this.selectedLink = this.filmInfo.links.find(v => v.url == filmLinkUrl)
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
      fetchFilms: action
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

}

export default FilmsStore