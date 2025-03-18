import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-openidconnect'; // Import Strategy from passport-openidconnect
import { Client } from 'openid-client';
import { Injectable } from '@nestjs/common';
import { keycloakConfig } from './keycloak.config';;

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') { 
    constructor() {
        super({
            client: new Client({ 
            client_id: keycloakConfig.clientId,
            client_secret: keycloakConfig.clientSecret, 
            redirect_uris: [keycloakConfig.callbackURL],
            response_types: ['code'], // Authorization Code Flow
            id_token_signed_response_alg: 'RS256',
                metadata: {
                    issuer: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}`,
                    authorization_endpoint: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/auth`,
                    token_endpoint: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
                    userinfo_endpoint: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/userinfo`,
                    jwks_uri: `${keycloakConfig.authServerUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/certs`
                }, 
            }),
            params: {
                scope: 'openid profile email', // Request these scopes
            },
            passReqToCallback: false, // You might need to set this to true depending on your needs
        });
    }

    async validate(tokenset: any): Promise<any> {
     // Process and return user information
     console.log('Successfully authenticated!');
     console.log(tokenset.claims());
     const user = {
       id: tokenset.claims().sub,
       username: tokenset.claims().preferred_username,
       email: tokenset.claims().email,
       // ...any other claims you need
     };

     return user; 
   }
}