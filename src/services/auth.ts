import RestClient from "./RestClient";
import { UserData } from "../redux/user/asyncAction";

export default class AuthServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  register(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}auth/register`,
      data
    );
  }

  login(data: any) {
    return this.restClient.post<{
      token: string;
    }>(`${this.restClient.config.baseURL}auth/login`, data);
  }

  loginGoogle() {
    return this.restClient.get<any[]>(`${this.restClient.config.baseURL}auth`);
  }

  loginGoogleCallback(query: any) {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}auth/callback?${query}`
    );
  }

  getProfile() {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}auth/profile`
    );
  }

  logout() {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}auth/logout`
    );
  }

  // getCurrentUser() {
  //   return this.restClient.get<UserData[]>(
  //     `${this.restClient.config.baseURL}user/get_user.php`
  //   );
  // }

  // getAllUser() {
  //   return this.restClient.get<any[]>(
  //     `${this.restClient.config.baseURL}user/get_all_user.php`
  //   );
  // }

  // updateUser(record: DataType) {
  //   return this.restClient.put<any>(
  //     `${this.restClient.config.baseURL}user/update.php?id=${record.id}`,
  //     record
  //   );
  // }

  deleteUser(id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}user/delete.php`,
      {
        id,
      }
    );
  }

  searchUser(search: string) {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}user/search.php`,
      { key: search }
    );
  }
}
