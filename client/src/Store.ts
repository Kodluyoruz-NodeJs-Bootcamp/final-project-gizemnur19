import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import AuthService from "./core/services/auth";

export default class AppStore {
  @persist
  @observable
  token: string | null = null;
  authService = new AuthService();

  @computed
  get isLoggedIn(): boolean {
    return this.token ? true : false;
  }
  

  @action
  logout = (): void => {
    this.authService.logout();
    this.token = null;
  };

}
