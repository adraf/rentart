import { useState } from "react"

export default function RegisterUser(){
  // State
  const [ noBueno, setNoBueno ] = useState('')

  function submitUserData(e){
    console.log('in')
    e.preventDefault()
    // Defining variables for validation
    const formData = new FormData(e.target)
    const parsedData = Object.fromEntries(formData.entries())
    const formKeys = []
    let str = ''
    
    // validating every field has been fulfilled
    for (const [key, value] of Object.entries(parsedData)) {
      if (!value) formKeys.push(key)
    }
    if (formKeys.length > 0){
      // If empty values were found we make a string with them to add to an error message
      formKeys.map(val => str = `${str}${val} ,`)
      str = str.substring(0, str.length - 2)
      setNoBueno('Seems you have missed some fields: \n' + str)
    } else {
      setNoBueno('')
    }
    

    //JSON.stringify(parsedData)
  }
  
  return(
    <fieldset>
      {/* If user doesen't fill one or more of the fields a warning appears */}
      {noBueno && <section className="nobueno"><p>{noBueno}</p></section>}
      <legend>Join the Art Rental Community!</legend>
      <form action="#" onSubmit={submitUserData}>
        <input type="text" name="name" placeholder="First and Last Name"/>
        <input type="text" name="address" placeholder="Address"/>
        <input type="text" name="username" placeholder="Username"/>
        <input type="text" name="email" placeholder="Email"/>
        <input type="password" name="password" placeholder="Password"/>
        <input type="password" name="passwordConfirmation" placeholder="Confirm Password"/>
        <label htmlFor="usertype">Are you an Artist, or an Appreciator?</label>
        <select name="usertype" id="usertype">
          <option value="" default defaultValue hidden>Choose</option>
          <option value="artist">Artist</option>
          <option value="appreciator">Appreciator</option>
        </select>
        <button type="submit">Join!</button>
      </form>
    </fieldset>
  )
}