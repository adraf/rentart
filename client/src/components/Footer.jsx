
import { Link } from "react-router-dom"
export default function Footer(){

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
  return (
    <footer>
<<<<<<< HEAD
      <p>Site created by Adam Rafferty, Anne-Laure Guillot and Antonio Climent at:<br />SEI, General Assembly© {new Date().getFullYear()}</p>
=======
      <p>&copy; General Assembly SEI-76 {year}</p>
      <Link className='footer-links' to='/about'>About us</Link>
>>>>>>> development
    </footer>
  )
}