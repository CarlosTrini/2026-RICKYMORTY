import apiClient from '@/lib/axios'
import type { CharacterResponse } from '@/types/apiTypes';


export const apiService = {

  async getCharacters(page: number = 1): Promise<CharacterResponse> {
    try {
      const queryPage = (page === 1 || !page) ? '' : `?page=${page}`;
      const response = await apiClient.get(`/character/${queryPage}`);
      return response.data;
    } catch (err) {
      console.error('Error al obtener los personajes', err)
      throw new Error('Error al obtener los personajes')
    }
  }
}
