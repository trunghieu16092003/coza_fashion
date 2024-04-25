import RestClient from "./RestClient";

export default class ProductImageServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getProductImages(idProduct: any) {
    let url = `${this.restClient.config.baseURL}images`;

    if (idProduct) {
      url += `/${idProduct}`;
    }

    return this.restClient.get<any[]>(url);
  }

  add(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}images`,
      data,
      "multipart/form-data"
    );
  }

  //   update(idProduct: any, inventoryId: any, data: any) {
  //     return this.restClient.put<any>(
  //       `${this.restClient.config.baseURL}productInventory/${idProduct}/${inventoryId}`,
  //       data
  //     );
  //   }

  delete(id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}images/${id}`
    );
  }

  //   searchCategory(data: string) {
  //     let url = `${this.restClient.config.baseURL}categories/search/${data}`;
  //     return this.restClient.get<any[]>(url);
  //   }
}
