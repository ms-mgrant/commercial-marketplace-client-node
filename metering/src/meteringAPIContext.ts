/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import * as coreHttp from "@azure/core-http";
import { MeteringAPIOptionalParams } from "./models";

const packageName = "microsoft.marketplace.metering";
const packageVersion = "1.0.0";

export class MeteringAPIContext extends coreHttp.ServiceClient {
  $host: string;
  apiVersion: string;

  /**
   * Initializes a new instance of the MeteringAPIContext class.
   * @param credentials Subscription credentials which uniquely identify client subscription.
   * @param options The parameter options
   */
  constructor(
    credentials: coreHttp.TokenCredential | coreHttp.ServiceClientCredentials,
    options?: MeteringAPIOptionalParams
  ) {
    if (credentials === undefined) {
      throw new Error("'credentials' cannot be null");
    }

    // Initializing default values for options
    if (!options) {
      options = {};
    }

    if (!options.userAgent) {
      const defaultUserAgent = coreHttp.getDefaultUserAgentValue();
      options.userAgent = `${packageName}/${packageVersion} ${defaultUserAgent}`;
    }

    if (!options.credentialScopes) {
      options.credentialScopes = [
        "20e940b3-4c77-4b0b-9a53-9e16a1b010a7/.default"
      ];
    }

    super(credentials, options);

    this.requestContentType = "application/json; charset=utf-8";

    this.baseUri =
      options.endpoint || "https://marketplaceapi.microsoft.com/api";

    // Assigning values to Constant parameters
    this.$host = options.$host || "https://marketplaceapi.microsoft.com/api";
    this.apiVersion = options.apiVersion || "2018-08-31";
  }
}
