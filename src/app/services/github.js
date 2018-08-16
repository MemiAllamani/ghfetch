'use strict';

let GitHub = require('github-api');


class GithubService {

    getClient(user, pass) {
        return new GitHub({
            username: user,
            password: pass
        });
    }

    async getProfile(client) {
        let resp = await client.getUser().getProfile();
        return resp.data;
    }

    async getRepos(client) {
        let resp = await client.getUser().listRepos();
        return resp.data;
    }

}

module.exports = new GithubService();
