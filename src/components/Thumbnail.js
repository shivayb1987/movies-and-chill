import React from "react"

const Item = ({ item }) => (
  <>
    <label>{item.title || item.name}</label>
    <img
      src={`http://image.tmdb.org/t/p/w185/${item.poster_path}`}
      alt="movie_poster"
    />
  </>
)

export default Item
