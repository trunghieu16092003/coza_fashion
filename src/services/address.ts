import axios from "axios";

export const getProvince = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: "https://vapi.vnappmob.com/api/province",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getDistrict = (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/district/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const getWard = (id: string) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: "get",
        url: `https://vapi.vnappmob.com/api/province/ward/${id}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
