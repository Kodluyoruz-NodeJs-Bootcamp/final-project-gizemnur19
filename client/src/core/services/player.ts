import { AxiosResponse } from "axios";
import http from "./http";

export default class PlayerService {
  async getPlayers(): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/player`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPlayerById(id: number): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/player/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserPlayers(): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/player/filter`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createPlayer(playerName: string): Promise<any> {
    try {
      const response: AxiosResponse = await http.post(`${process.env.REACT_APP_BASE_URL}/player`,{
        playerName
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async editPlayer(playerId: number, playerName: string): Promise<any> {
    try {
      const response: AxiosResponse = await http.patch(`${process.env.REACT_APP_BASE_URL}/player/edit/${playerId}`,{
        playerName
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async sharePlayer(playerId: number): Promise<any> {
    try {
      const response: AxiosResponse = await http.patch(`${process.env.REACT_APP_BASE_URL}/player/${playerId}`, {
        playerId
      });
      return response ;
    } catch (error) {
      throw error;
    }
  }

  async likePlayer(playerId: number, likeCount:number): Promise<any> {
    try {
      const response: AxiosResponse = await http.patch(`${process.env.REACT_APP_BASE_URL}/player/edit/${playerId}`, {
        playerId,
        likeCount
      });
      return response ;
    } catch (error) {
      throw error;
    }
  }

  async deletePlayer(playerId: number): Promise<any> {
    try {
      const response: AxiosResponse = await http.delete(`${process.env.REACT_APP_BASE_URL}/player/${playerId}`);
      return response ;
    } catch (error) {
      throw error;
    }
  }
}