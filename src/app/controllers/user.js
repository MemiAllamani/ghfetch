'use strict';

const githubService = require('../services/github');
const userProfileService = require('../services/profile');
const repoService = require('../services/repos');


module.exports = {
    info: {
        auth: 'jwt',
        handler: async (request, h) => {
            const sessionId = request.auth.credentials.id;
            const profiles = await userProfileService.findBy({
                session_id: sessionId
            });

            if (profiles.length > 0) {
                return profiles[0];
            } else {
                return Boom.notFound('Profile could not be found');
            }
        }
    },
    repos: {
        auth: 'jwt',
        handler: async (request, h) => {
            const sessionId = request.auth.credentials.id;
            let repos = await repoService.findBy({
                session_id: sessionId
            });

            if (repos.length === 0) {
                const {username, password} = request.auth.credentials;
                const ghClient = githubService.getClient(username, password);
                repos = await githubService.getRepos(ghClient);
                repos = repos.map((ghRepo) => {
                    return {
                        name: ghRepo.name,
                        description: ghRepo.description,
                        private: ghRepo.private,
                        forks_count: ghRepo.forks_count,
                        stargazers_count: ghRepo.stargazers_count,
                        session_id: sessionId
                    };
                });
                await repoService.insert(repos);
            }

            return repos;
        }
    }
}