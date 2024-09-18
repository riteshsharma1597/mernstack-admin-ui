//Auth service

import { CreatUserData, Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/auth/self");
export const logout = () => api.post("/auth/logout");
export const getUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);
export const getTenants = () => api.get("/tenants");
export const createUser = (user: CreatUserData) => api.post("/users", user);
export const updateUser = (user: CreatUserData, id: number) =>
  api.patch(`/users/${id}`, user);
