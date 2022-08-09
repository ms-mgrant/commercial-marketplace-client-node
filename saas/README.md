## Azure SaaSAPI SDK for JavaScript

This package contains an isomorphic SDK for SaaSAPI.

### Currently supported environments

- Node.js version 8.x.x or higher
- Browser JavaScript

### Installation

```bash
npm install microsoft.marketplace.saas
```

### Usage

#### Authorization

To use this library in your project, you will need to [create credentials using Azure Identity](https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest).

Here is an example of the authorization process from the [sample code](https://github.com/microsoft/commercial-marketplace-client-node/tree/main/saas/test).

```Typescript

import * as azureIdentity from "@azure/identity";

let credential = new azureIdentity.ClientSecretCredential(
    tenantId: process.env.AAD_TENANT_ID || '',
    clientId: process.env.AAD_APP_CLIENT_ID || '',
    clientSecret: process.env.AAD_APP_CLIENT_SECRET || ''
);

```
&nbsp;
#### Creating A Client

Once these credentials are created, you can create a new SaaS API Client.

```Typescript
let saasClient = new SaaSAPI(creds); // Use credentials from the last step.
```
&nbsp;

#### Sample code

Refer the test code in the [commercial-marketplace-client-node/saas/test](https://github.com/microsoft/commercial-marketplace-client-node/tree/main/saas/test) folder.


## Related projects

- [Microsoft Azure SDK for Javascript](https://github.com/Azure/azure-sdk-for-js)


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fcdn%2Farm-cdn%2FREADME.png)