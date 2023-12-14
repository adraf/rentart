import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'


export default function FilterBox(
  arts,
  setArts,
  artistChoice,
  setArtistChoice,
  movementChoice,
  setMovementChoice,
  mediaChoice,
  setMediaChoice,
  artWidth,
  setArtWidth,
  artHeight,
  setArtHeight,
  artPrice,
  setArtPrice,
  search,
  setSearch,
  artistAll,
  movementList,
  mediaList,
  handleChange1,
  handleChange2,
  handleChange3,
  valuetext) {

  //* LIST OF ARTISTS

  //* LIST OF MOVEMENT

  //* LIST OF MEDIA

  //* WIDTH SLIDER

  //* HEIGHT SLIDER

  //* PRICE SLIDER

  //! Functions


  //! JSX
  return (
<>


    <div className='modal-container'>
      <h3>Filters</h3>
      <input
        placeholder="Search..."
        className="search"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <section className='filter-selection'>
        <select
          className="artist-list"
          onChange={(e) => setArtistChoice(e.target.value)}
          value={artistChoice}
        >
          {artistAll
            .map((artistChoice, i) => {
              return <option key={i} value={artistChoice}>{artistChoice}</option>
            })
          }
        </select>
      </section>
      <section className='filter-selection'>
        <select
          className="movement-list"
          onChange={(e) => setMovementChoice(e.target.value)}
          value={movementChoice}
        >
          {movementList
            .map((movementChoice, i) => {
              return <option key={i} value={movementChoice}>{movementChoice}</option>
            })
          }
        </select>
      </section>
      <section className='filter-selection'>
        <select
          className="media-list"
          onChange={(e) => setMediaChoice(e.target.value)}
          value={mediaChoice}
        >
          {mediaList
            .map((mediaChoice, i) => {
              return <option key={i} value={mediaChoice}>{mediaChoice}</option>
            })
          }
        </select>
      </section>
      <Box className='filter-sliders-container'>
        <label>Width Range (cm)</label>
        <Slider
          min={0}
          max={1000}
          getAriaLabel={() => 'Minimum distance'}
          value={artWidth}
          onChange={handleChange1}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
        <label>Height Range (cm)</label>
        <Slider
          min={0}
          max={1000}
          getAriaLabel={() => 'Minimum distance shift'}
          value={artHeight}
          onChange={handleChange2}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
        <label>Price Range (£)</label>
        <Slider
          min={0}
          max={100000}
          getAriaLabel={() => 'Minimum distance shift'}
          value={artPrice}
          onChange={handleChange3}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          disableSwap
        />
      </Box>
    </div>
    </>
    )
}