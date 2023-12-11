// Loader for individual art page
import axios from "axios"

export async function getIndArt(artId) {
      const res = await axios.get(`api/art/${artId}`)
      console.log(res.data)
      return res.data
  }
