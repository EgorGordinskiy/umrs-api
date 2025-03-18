export const keycloakConfig = {
    authServerUrl: 'http://your-keycloak-server:8080/auth',
    realm: 'your-realm-name',
    clientId: 'your-client-id',
    clientSecret: 'your-client-secret', // If you are using a confidential client
    callbackURL: 'http://localhost:3000/auth/callback', // Adjust if needed
};