import { AxiosResponse } from "axios";
import http from "./http";

export default class ReviewService {
  async getReviews(id:number): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/review/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postComment(movieId: number, comment: string): Promise<any> {
    try {
      const response: AxiosResponse = await http.post(`${process.env.REACT_APP_BASE_URL}/review`, {
        movieId,
        comment
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getPlayerReviews(id:number): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/review/player/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async postPlayerComment(playerId: number, comment: string): Promise<any> {
    try {
      const response: AxiosResponse = await http.post(`${process.env.REACT_APP_BASE_URL}/review/player`, {
        playerId,
        comment
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}