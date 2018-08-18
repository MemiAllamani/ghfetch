'use strict';

const JWT = require('jsonwebtoken');

const githubService = require('../services/github');
const sessionService = require('../services/session');
const userProfileService = require('../services/profile');
const jwtSecret = require('../configs').authentication.key;


module.exports = {
    login: {
        auth: false,
        handler: (request, h) => {
            const {username, password} = request.payload
            const ghClient = githubService.getClient(username, password);
            let ghProfile = null;
            try {
                ghProfile = await githubService.getProfile(ghClient);
            } catch (err) {
                console.log('Authentication failed: ', err);
            }

            if (!ghProfile) {
                Boom.unauthorized('Invalid username or password');
            }

            const sessionId = await sessionService.create({
                username, password
            });
            await userProfileService.create({
                name: ghProfile.name,
                company: ghProfile.company,
                location: ghProfile.location,
                avatarUrl: ghProfile.avatarUrl,
                followers: ghProfile.followers,
                following: ghProfile.following,
                session_id: sessionId
            });

            return {
                token: JWT.sign({id: sessionId}, jwtSecret)
            };
        }
    },
    logout: {
        auth: true,
        handler: (request, h) => {
            const sessionId = request.auth.credentials.id;
            await sessionService.delete(sessionId);
        }    
    }
}