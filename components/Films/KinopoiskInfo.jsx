const KinopoiskInfo = ({ id, className }) => {
  return <img src={`https://rating.kinopoisk.ru/${id}.gif`} className={className} />
}

export default KinopoiskInfo