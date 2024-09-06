export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type Tenant = {
  id: number;
  name: string;
  address: string;
};
