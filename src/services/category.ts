import RestClient from "./RestClient";

export default class CategoryServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getCategory(id?: string) {
    let url = `${this.restClient.config.baseURL}categories`;

    if (id) {
      url += `/${id}`;
    }

    return this.restClient.get<any[]>(url);
  }

  addCategory(name: string) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}categories`,
      { name }
    );
  }

  updateCategory(id: string, name: string) {
    return this.restClient.put<any>(
      `${this.restClient.config.baseURL}categories/${id}`,
      { name }
    );
  }

  deleteCategory(id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}categories/${id}`
    );
  }

  searchCategory(data: string) {
    let url = `${this.restClient.config.baseURL}categories/search/${data}`;
    return this.restClient.get<any[]>(url);
  }
}
