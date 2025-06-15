import { API } from "../_api"

export const getSantri = async () => {
  const { data } = await API.get("/santri")
  return data.data
}

export const createSantri = async (data) => {
  try {
    const response = await API.post("/santri", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const showSantri = async (id) => {
  try {
    const { data } = await API.get(`/santri/${id}`)
    return data.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const updateSantri = async (id, data) => {
  try {
    const response = await API.post(`/santri/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteSantri = async (id) => {
  try {
    await API.delete(`/santri/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
