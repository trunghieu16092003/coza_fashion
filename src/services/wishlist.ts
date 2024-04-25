import RestClient from "./RestClient";

export default class WishlistServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  addToWishlist(data: any) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}wishlist`,
      data
    );
  }

  getCart() {
    return this.restClient.get<any[]>(`${this.restClient.config.baseURL}cart`);
  }

  updateCart(id: string, data: any) {
    return this.restClient.put<any>(
      `${this.restClient.config.baseURL}cart/${id}`,
      data
    );
  }

  deleteCart(id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}cart/${id}`
    );
  }
}
