import { AxiosResponse } from "axios";
import http from "./http";

export default class MovieService {
  async getMovies(): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/movie`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getMovieById(id: number): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/movie/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserMovies(): Promise<any> {
    try {
      const response: AxiosResponse = await http.get(`${process.env.REACT_APP_BASE_URL}/movie/filter`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

 
  async createMovie(movieName: string, category:string ): Promise<any> {
    try {
      const response: AxiosResponse = await http.post(`${process.env.REACT_APP_BASE_URL}/movie`,{
        movieName,
        category
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async editMovie(movieId: number, movieName: string , category:string): Promise<any> {
    try {
      const response: AxiosResponse = await http.patch(`${process.env.REACT_APP_BASE_URL}/movie/edit/${movieId}`,{
        movieName,
        category
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async shareMovie(movieId: number): Promise<any> {
    try {
      const response: AxiosResponse = await http.patch(`${process.env.REACT_APP_BASE_URL}/movie/${movieId}`, {
        movieId
      });
      return response ;
    } catch (error) {
      throw error;
    }
  }

  async likeMovie(movieId: number, likeCount:number): Promise<any> {
    try {
      const response: AxiosResponse = await http.patch(`${process.env.REACT_APP_BASE_URL}/movie/edit/${movieId}`, {
        movieId,
        likeCount
      });
      return response ;
    } catch (error) {
      throw error;
    }
  }

  async deleteMovie(movieId: number): Promise<any> {
    try {
      const response: AxiosResponse = await http.delete(`${process.env.REACT_APP_BASE_URL}/movie/${movieId}`);
      return response ;
    } catch (error) {
      throw error;
    }
  }
}