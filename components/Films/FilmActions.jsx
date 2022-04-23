import { values } from "mobx"
import { Button } from "react-bootstrap"
import { injectStore } from "stores/Store"
import { Eye, EyeSlash, Recycle, Trash } from 'react-bootstrap-icons';

const ingoreButton = (selectedFilm, updateFilm) => {
  if (selectedFilm.filmInfo.ignore)
    return <Button variant="primary" onClick={() => updateFilm(selectedFilm.id, { ignore: false })}><Recycle /> Restore</Button>
  else
    return <Button variant="primary" onClick={() => updateFilm(selectedFilm.id, { ignore: true })}><Trash /> Ignore</Button>
}
const viewedButton = (selectedFilm, updateFilmLinks) => {
  const { filmInfo: { links } } = selectedFilm
  const entirelyViewed = links.every(link => link.viewed)
  const linksIds = links.map(linkValue => {
    return { id: linkValue.id, rssSource: linkValue.rssSource }
  })
  if (entirelyViewed)
    return <Button variant="primary" onClick={() => updateFilmLinks(linksIds, { viewed: false })}><Eye /> Mark unread</Button>
  else
    return <Button variant="primary" onClick={() => updateFilmLinks(linksIds, { viewed: true })}><EyeSlash /> Mark read</Button>
}

const FilmActions = ({ store }) => {
  const { films } = store;
  const { selectedFilm } = films;

  if (selectedFilm == null || selectedFilm.loading || selectedFilm.error)
    return null;

  return <div className="py-2">
    {ingoreButton(selectedFilm, films.updateFilm)}
    {' '}
    {viewedButton(selectedFilm, films.updateFilmLinks)}
  </div>
}

export default injectStore(FilmActions)