import RestClient from "./RestClient";

export default class SizeServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getSize(id?: any) {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}sizes`,
      { id: id }
    );
  }
}
