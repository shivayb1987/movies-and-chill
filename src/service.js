import axios from "axios"
import { API_URL, API_KEY } from "./utilities/Config"
import { history } from "./store"
const instance = axios.create({
  baseURL: URL,
  timeout: 4 * 60 * 1000 // ms,
})

const METHODS = {
  GET: (url, _, config) => instance.get(url, config),
  POST: instance.post,
  PUT: instance.put
}

export const invokeService = (
  requestId,
  requestData,
  methodType = "GET",
  config
) => {
  const axiosMethod = METHODS[methodType]
  const url = `${API_URL}${requestId}&api_key=${API_KEY}`
  return axiosMethod(url, requestData, config)
    .then(response => {
      return response
    })
    .catch(function(error) {
      console.log("error ", error)
      history.push("/error")
      return {
        status: "1"
      }
    })
  // }
}
