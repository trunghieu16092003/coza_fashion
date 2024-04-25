import RestClient from "./RestClient";

export default class OrderServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  addOrder(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}order/add`,
      data
    );
  }

  getAllOrder() {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}order/admin`
    );
  }

  getOrder() {
    return this.restClient.get<any[]>(`${this.restClient.config.baseURL}order`);
  }

  getOrderDetails(code: string) {
    return this.restClient.get<any[]>(
      `${this.restClient.config.baseURL}order_details/${code}`
    );
  }

  updateOrder(data: any, code: string) {
    return this.restClient.put<any>(
      `${this.restClient.config.baseURL}order/${code}`,
      data
    );
  }

  // update(id: string, data: any) {
  //   return this.restClient.patch<any>(
  //     `${this.restClient.config.baseURL}products/${id}`,
  //     data
  //   );
  // }

  deleteCart(cart_id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}cart/delete_cart.php`,
      {
        cart_id,
      }
    );
  }
}
