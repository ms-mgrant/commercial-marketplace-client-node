/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 */

import { expect } from 'chai';
import { SaaSAPI } from '../src/saaSAPI';
import * as azureIdentity from "@azure/identity";
import {WebResourceLike} from "@azure/core-http/types/3.1/src/webResource";
import {HttpHeaders} from "@azure/core-http";

class MarketplaceCredentials {
    constructor(tokenCredential : azureIdentity.TokenCredential) {
        this.tokenCredential = tokenCredential;
    }

    public async signRequest(webResource: WebResourceLike): Promise<WebResourceLike>{

        if (!webResource) {
            return Promise.reject(new Error("webResource cannot be null or undefined and must be of type \"object\"."));
        }

        if (!webResource.headers) {
            webResource.headers = new HttpHeaders();
        }

        let token = await this.tokenCredential.getToken( "20e940b3-4c77-4b0b-9a53-9e16a1b010a7/.default");

        if (token) {
            webResource.headers.set("Authorization", "Bearer " + token.token);
        } else {
            return Promise.reject(new Error("Could not authorize the token."));
        }

        return Promise.resolve(webResource);
    }

    tokenCredential: azureIdentity.TokenCredential;
}


function get_client_secret_credential() {
    let tenantId = process.env.AAD_TENANT_ID || '';
    let clientId = process.env.AAD_APP_CLIENT_ID || '';
    let clientSecret = process.env.AAD_APP_CLIENT_SECRET || '';

    if (tenantId == ''){
        console.log("Environment variable AAD_TENANT_ID is not set. Failing.");
        throw "Invalid environment";
    }

    if (clientId == ''){
        console.log("Environment variable AAD_APP_CLIENT_ID is not set. Failing.");
        throw "Invalid environment";
    }

    if (clientSecret == ''){
        console.log("Environment variable AAD_APP_CLIENT_SECRET is not set. Failing.");
        throw "Invalid environment";
    }    

    let credential = new azureIdentity.ClientSecretCredential(
        tenantId!,
        clientId!,
        clientSecret!);

    return new MarketplaceCredentials(credential);
}

describe ("SaaSAPI", () => {
    describe("Basics", () => {
        it ("Should get a list of subscriptions", async () => {
            let creds = get_client_secret_credential();
            let saasClient = new SaaSAPI(creds);
            let subs = saasClient.fulfillmentOperations.listSubscriptions();
            let foundAtLeastOne = false;
            for (let iter = await subs.next(); iter != undefined && iter != null; iter = await subs.next()) {
                foundAtLeastOne = true;
                console.log(iter.value.id);
                break;
            }
            expect(foundAtLeastOne).to.be.true;
        })
    })
});