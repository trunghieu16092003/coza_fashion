import RestClient from "./RestClient";

export default class ColorServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getColor(id?: any) {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}colors`,
      { color_id: id }
    );
  }
}
