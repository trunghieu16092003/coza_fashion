import RestClient from "./RestClient";

export default class CouponServices {
  restClient: RestClient;
  constructor(restClient = new RestClient()) {
    this.restClient = restClient;
  }

  getCoupon(id?: string) {
    let url = `${this.restClient.config.baseURL}coupons`;

    if (id) {
      url += `/${id}`;
    }

    return this.restClient.get<any[]>(url);
  }

  addCoupon(name: string) {
    return this.restClient.post<any>(
      `${this.restClient.config.baseURL}coupons`,
      { name }
    );
  }

  updateCoupon(id: string, data: any) {
    return this.restClient.put<any>(
      `${this.restClient.config.baseURL}coupons/${id}`,
      { data }
    );
  }

  deleteCoupon(id: any) {
    return this.restClient.delete<any>(
      `${this.restClient.config.baseURL}coupons/${id}`
    );
  }

  searchCoupon(data: string) {
    let url = `${this.restClient.config.baseURL}coupons/search/${data}`;
    return this.restClient.get<any[]>(url);
  }
}
