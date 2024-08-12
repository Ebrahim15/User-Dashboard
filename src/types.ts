export interface Users {
    data: User[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
  }
  
  export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  }