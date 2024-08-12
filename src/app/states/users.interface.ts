import { User, Users } from "../../types";

// export interface UsersState {
//     isLoading: boolean;
//     users: User[];
//     total: number;
//     page: number;
//     perPage: number;
//     totalPages: number;
//     searchedUsers: User[];
//     error: string | null;
// }

export interface UsersState {
    isLoading: boolean,
    users: User[],
    total: number,
    page: number,
    perPage: number,
    totalPages: number,
    searchedUsers: User[],
    error: string | null,
    searchError: string | null,
}