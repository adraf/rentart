import axios from 'axios'
import { formToObj } from '../helpers/common'



export async function editProfile(request, id){
  const data = await formToObj(request)
  return await axios.put(`/api/profile/${id}`, data, {
    validateStatus: () => true,
  })
}

