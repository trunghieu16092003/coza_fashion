import axios, { AxiosRequestConfig } from "axios";
import local from "../constants/local";

const DEFAULT_CONFIG = {
  baseURL: import.meta.env.VITE_BASE_API,
  headers: {
    Accept: "application/json, text/plain, */*",
  },
};

export default class RestClient {
  config: AxiosRequestConfig;
  constructor(config = {}) {
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
    };
  }

  async get<T>(url: string, params = {}, config = {}) {
    return this.request<T>(url, {
      ...config,
      params,
    });
  }

  async post<T>(
    url: string,
    data?: any,
    option: string = "application/json",
    config: AxiosRequestConfig = {}
  ) {
    const finalConfig: AxiosRequestConfig = {
      ...config,
      method: "post",
      headers: {
        ...this.config.headers,
        "Content-Type": option,
      },
    };

    if (option === "multipart/form-data") {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      finalConfig.data = formData;
    } else {
      finalConfig.data = data;
    }

    return this.request<T>(url, finalConfig);
  }
  async put<T>(url: string, data?: any, config = {}) {
    return this.request<T>(url, {
      ...config,
      data,
      method: "put",
    });
  }
  async delete<T>(url: string, params = {}, config = {}) {
    return this.request<T>(url, {
      ...config,
      params,
      method: "delete",
    });
  }
  async patch<T>(url: string, data?: any, config = {}) {
    return this.request<T>(url, {
      ...config,
      data,
      method: "patch",
    });
  }

  async request<T>(url: string, config: any) {
    const token = localStorage.getItem(local.TOKEN);
    const auth = token && `Bearer ${token}`;
    const finalHeaderConfig = {
      ...config.headers,
      ...this.config.headers,
      Authorization: auth,
    };

    const finalConfig = {
      ...this.config,
      ...config,
      url,
      headers: { ...finalHeaderConfig },
    };

    try {
      const res = await axios.request(finalConfig);
      return await Promise.resolve(res.data as T);
    } catch (err) {
      // 404 =>  404page
      /// 500 => 500page

      // 401  => logout
      // 403 => home

      return Promise.reject(err);
    }
  }
}
