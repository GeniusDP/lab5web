import { isAuthenticated, popupOpen, token, user } from "./store";
import createAuth0Client from "@auth0/auth0-spa-js";

async function createClient() {
    return await createAuth0Client({
        domain: "dev-c1ts3y80.us.auth0.com",
        client_id: "pcDKnq6z4IsKnyuVmH1GmP8MLsn1xNLR",
    });
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        let newVar = await client.loginWithPopup(options);
        user.set(await client.getUser());
        const accessToken = await client.getIdTokenClaims();
        token.set(accessToken.__raw);
        isAuthenticated.set(true);
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logoutClient(client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logoutClient: logoutClient,
};

export default auth;
