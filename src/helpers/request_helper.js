import { isLoading, token } from "../store";
import { get } from "svelte/store";

class RequestHelper {
    API_URL = "https://web-lab5-zaranik.herokuapp.com/v1/graphql";
    async fetchGraphQL(operationsDoc, operationName, variables) {
        const result = await fetch(this.API_URL, {
            method: "POST",
            body: JSON.stringify({
                query: operationsDoc,
                variables: variables,
                operationName: operationName,
            }),
            headers: {
                Authorization: `Bearer ${get(token)}`,
            },
        });
        return await result.json();
    }

    async startFetchMyQuery(operationsDoc) {
        const { errors, data } = await this.fetchMyQuery(operationsDoc);
        if (errors) {
            throw errors;
        }
        //console.log("array of todos from start = " + JSON.stringify(data));
        isLoading.set(false);
        return data;
    }

    executeMyMutation(operationsDoc, variables = {}) {
        return this.fetchGraphQL(operationsDoc, "MyMutation", variables);
    }

    async startExecuteMyMutation(operationsDoc, variables = {}) {
        const { errors, data } = await this.executeMyMutation(operationsDoc, variables);
        if (errors) {
            throw errors;
        }
        //console.log(data);
        return data;
    }
    fetchMyQuery(operationsDoc) {
        return this.fetchGraphQL(operationsDoc, "MyQuery", {});
    }
}

export default new RequestHelper();
