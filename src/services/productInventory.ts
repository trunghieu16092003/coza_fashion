import RestClient from "./RestClient";

export default class ProductInventoryServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getIntventory(idProduct: any, inventoryId?: string, page?: number) {
    let url = `${this.restClient.config.baseURL}productInventory/${idProduct}`;

    if (inventoryId) {
      url += `/${inventoryId}`;
    }

    return this.restClient.get<any[]>(url, { page });
  }

  add(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}productInventory`,
      data
    );
  }

  update(idProduct: any, inventoryId: any, data: any) {
    return this.restClient.put<any>(
      `${this.restClient.config.baseURL}productInventory/${idProduct}/${inventoryId}`,
      data
    );
  }

  delete(id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}productInventory/${id}`
    );
  }

  searchCategory(data: string) {
    let url = `${this.restClient.config.baseURL}categories/search/${data}`;
    return this.restClient.get<any[]>(url);
  }
}
