// import { useState } from 'react'
// import { Link } from 'react-router-dom'

export default function FilterBox() {

  // ! State


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
                <div className="css-k008qs">
                  <div className="filters-type css-k008qs">
                    <div className="succulent-type-filter css-k008qs">
                      <input className="succulent-type-checkbox" type="checkbox" value="painting" />
                      <label>Painting</label>
                    </div>
                    <div className="palm-type-filter css-k008qs">
                      <input className="palm-type-checkbox" type="checkbox" value="scu" />
                      <label>Scupture</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
