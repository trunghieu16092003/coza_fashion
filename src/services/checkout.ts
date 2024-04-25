import RestClient from "./RestClient";

export default class CheckoutServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  momoPayment(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}checkout/momo`,
      data
    );
  }

  getCart() {
    return this.restClient.get<any[]>(`${this.restClient.config.baseURL}cart`);
  }

  //   updateCart(cart_id: number, quantity: number) {
  //     return this.restClient.put<any>(
  //       `${this.restClient.config.baseURL}cart/update_cart.php`,
  //       { cart_id, quantity }
  //     );
  //   }

  //   deleteCart(cart_id: any) {
  //     return this.restClient.delete<any>(
  //       `${this.restClient.config.baseURL}cart/delete_cart.php`,
  //       {
  //         cart_id,
  //       }
  //     );
  //   }
}
