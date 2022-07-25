import { api } from "../config/APIAccesss.config";
const url = "/collection";
export const getList = async () => {
  try {
    const res = await api(url, { method: "GET" });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const createTodo = async (data: {
  description: string;
  date: string;
  title: string;
}) => {
  try {
    const res = await api(url, { method: "POST", data: data });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const editTodo = async (
  data: {
    description: string;
    date: string;
    title: string;
  },
  id: number
) => {
  try {
    const res = await api(`${url}/${id}`, { method: "PUT", data: data });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const deleteTodo = async (id: number) => {
  try {
    const res = await api(`${url}/${id}`, { method: "DELETE" });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
export const getByIdTodo = async (id: number) => {
  try {
    const res = await api(`${url}/${id}`, { method: "GET" });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
