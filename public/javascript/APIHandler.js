import axios from 'axios'

class APIHandler {
  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList () {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error)
      return []
    }
  }

  async getOneRegister (id) {
    try {
      const response = await axios.get(`${this.BASE_URL}/characters/${id}`);
      if(response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async createOneRegister (characterData) {
    try {
      const response = await axios.post(`${this.BASE_URL}/characters`, characterData);
      if(response.status === 201) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async updateOneRegister (id, characterData) {
    try {
      const response = await axios.put(`${this.BASE_URL}/characters/${id}`, characterData)
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error)
    }
  }

  async deleteOneRegister (id) {
    try {
      const response = await axios.delete(`${this.BASE_URL}/characters/${id}`)
      if(response.status === 200) {
        return "Character has been successfully deleted"
      } 
    } catch (error) {
      console.log(error)
    }
  }
}