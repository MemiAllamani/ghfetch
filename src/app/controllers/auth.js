'use strict';

const JWT = require('jsonwebtoken');
const Joi = require('joi');
const Boom = require('boom');

const githubService = require('../services/github');
const sessionService = require('../services/session');
const userProfileService = require('../services/profile');
const jwtSecret = require('../configs').authentication.key;


module.exports = {
    login: {
        auth: false,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
        },
        handler: async (request, h) => {
            const {username, password} = request.payload
            const ghClient = githubService.getClient(username, password);
            let ghProfile = null;
            try {
                ghProfile = await githubService.getProfile(ghClient);
            } catch (err) {}

            if (!ghProfile) {
                return Boom.unauthorized('Invalid username or password');
            }
            try {
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
                
            } catch (err) {
                console.log(err);
            }
        }
    },
    logout: {
        auth: 'jwt',
        handler: async (request, h) => {
            const sessionId = request.auth.credentials.id;
            await sessionService.delete(sessionId);
            return {};
        }    
    }
}