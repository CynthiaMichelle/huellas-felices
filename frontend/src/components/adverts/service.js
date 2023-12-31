import client from "../../api/client";

const advertsPath = "/anuncios";
const advertsPublicPath = "/anuncios_publicos";
const adoptionRequestPath = "/formulario_adopcion"; // ruta al formulario de adopcion

export const getTags = () => {
  return client.get(`${advertsPublicPath}/tags`);
};

export const getAdverts = () => {
  return client.get(advertsPublicPath);
};

export const getAdvert = (advertId) => {
  return client.get(`${advertsPath}/${advertId}`);
};

export const deleteAdvert = (advertId) => {
  return client.delete(`${advertsPath}/${advertId}`);
};

export const createAdvert = (newAdvert) => {
  return client.post(advertsPath, newAdvert, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const createRequest = (newRequest) => {
  return client.post(adoptionRequestPath, newRequest, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
