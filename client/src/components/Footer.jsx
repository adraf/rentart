
import { Link } from "react-router-dom"
export default function Footer(){

const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
  return (
    <footer>
      <p>&copy; General Assembly SEI-76 {year}</p>
      <Link className='footer-links' to='/about'>About us</Link>
    </footer>
  )
}