import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "./utils";

export const BASE_API_URL = "http://localhost:4000/graphql";
export function useClient() {
    const {token} = getAccessToken();
    return new GraphQLClient(BASE_API_URL, {
        headers: {authorization: token}
    });
}
