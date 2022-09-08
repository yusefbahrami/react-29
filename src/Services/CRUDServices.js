import BaseAxiosURL from "../URLs/BaseAxiosURL";

export const Get = async (route, id) => {
  let result;
  if (id === null) {
    result = await BaseAxiosURL.get(`/${route}`);
  } else if (id !== null) {
    result = await BaseAxiosURL.get(`/${route}/${id}`);
  }
  return result;
};

export const Delete = async (route, id) => {
  const result = await BaseAxiosURL.delete(`/${route}/${id}`);
  return result;
};

export const Post = async (route, data) => {
  const result = await BaseAxiosURL.post(`/${route}`, data);
  return result;
};

export const Put = async (route, id, data) => {
  const result = await BaseAxiosURL.put(`/${route}/${id}`, data);
  return result;
};
