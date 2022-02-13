import { AxiosResponse } from "axios";
import http from "./http";

export default class AuthService {
    async login(username: string, password: string): Promise<any> {
        try {
            const response: AxiosResponse = await http.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, {
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async signup(firstName: string,lastName: string,username: string, password: string): Promise<any> {
        try {
            const response: AxiosResponse = await http.post(`${process.env.REACT_APP_BASE_URL}/auth/register`, {
                firstName,
                lastName,
                username,
                password
            });
            localStorage.setItem('token', response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async loadSession(): Promise<string | null> {
        const token = localStorage.getItem('token');
        return token;
    }

    async logout(): Promise<boolean> {
        localStorage.removeItem('token');
        return true;
    }
}