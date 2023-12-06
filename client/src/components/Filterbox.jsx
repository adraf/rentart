import { useLoaderData } from "react-router-dom"
// import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function FilterBox() {
  
  const allArts = useLoaderData()

  const artistAll = [...new Set(allArts.map(art => art.artist))]
  artistAll.unshift('All Artists')

  const [artist, setArtist] = useState('All Artists')


  //! Functions
  function handleSubmit(e) {
    e.preventDefault()
  }

  //! JSX
  return (
    <>
      <div className="filters-container">
        <h3 className="filter-title">Filter</h3>
        <div className="filter-accordion">

          <div className="filter-accordion-wrapper">
            <button type="button" id="accordion-button-:r0:" aria-expanded="true" aria-controls="accordion-panel-:r0:" className="filter-accordion-button" data-index="0">
              <div className="button-title">Art Category</div>
              <svg viewBox="0 0 24 24" focusable="false" className="filter-icon" aria-hidden="true">
                <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>
            </button>
            <div className="filter-collapse" style="overflow: hidden; display: block; opacity: 1; height: auto;">
              <div role="region" id="accordion-panel-:r0:" aria-labelledby="accordion-button-:r0:" className="filter-accordion__panel">
                <div className="">
                  <div className="filters-types">
                    <div className="painting-filter">
                      <input className="painting-checkbox" type="checkbox" value="painting" />
                      <label>Painting</label>
                    </div>
                    <div className="sculpture-filter">
                      <input className="sculpture-checkbox" type="checkbox" value="sculpture" />
                      <label>Scupture</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="filter-accordion-wrapper">
            <button type="button" id="accordion-button-:r0:" aria-expanded="true" aria-controls="accordion-panel-:r0:" className="filter-accordion-button" data-index="0">
              <div className="button-title">Artist</div>
              <svg viewBox="0 0 24 24" focusable="false" className="filter-icon" aria-hidden="true">
                <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
              </svg>
            </button>
            <div className="filter-collapse" style="overflow: hidden; display: block; opacity: 1; height: auto;">
              <form onSubmit={handleSubmit}>
                <select className="genres-list" onChange={(e) => setArtist(e.target.value)} value={artist}>
                  {allArts
                    .map((genreChoice, i) => {
                      return <option key={i} value={genreChoice}>{genreChoice}</option>
                    })
                  }
                </select>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
