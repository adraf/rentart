import axios from "axios"

export default async function submitData(parsedData){
  try {
    // Get logged in
    const res = await axios.post('/api/login', parsedData)
    // Save data
    const userData = res.data;
    sessionStorage.setItem('data', userData)

    return res.data

  } catch (error) {
    return error
  }
}