import RestClient from "./RestClient";

export default class ProductServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getProducts(id?: string, page?: number, keyword?: string) {
    let url = `${this.restClient.config.baseURL}products`;

    if (id) {
      url += `/${id}`;
    }

    return this.restClient.get<any[]>(url, { page, keyword });
  }
  add(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}products`,
      data
    );
  }

  update(id: string, data: any) {
    return this.restClient.patch<any>(
      `${this.restClient.config.baseURL}products/${id}`,
      data
    );
  }

  delete(id: string, is_disabled: any) {
    return this.restClient.put<any>(
      `${this.restClient.config.baseURL}products/${id}`,
      { is_disabled }
    );
  }
}
