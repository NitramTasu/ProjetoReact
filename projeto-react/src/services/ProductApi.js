import axios from "axios";

const MERCADOLIBRE_API = "https://api.mercadolibre.com";

export const searchProduct = value => {
  return axios.get(MERCADOLIBRE_API + `/sites/MLU/search?q=${value}`);
};

export const getProduct = prodId => {
  return axios.all([
    axios.get(MERCADOLIBRE_API + `/items/${prodId}`),
    axios.get(MERCADOLIBRE_API + `/items/${prodId}/description`)
  ]);
};
