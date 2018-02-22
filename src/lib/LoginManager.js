const Promise = require('es6-promise').Promise;

const { username : correct_username, password : correct_password, full_name } = require('../../.env.json');

module.exports = class LoginManager {

    constructor() {

    }

    checkLoggedIn() {
        return new Promise(resolve => {
            setTimeout(() => {
                if (localStorage.getItem('drag-drop-logged-in') === "true") resolve({ username: correct_username, full_name });
                else resolve(null);
            }, 2500);
        })
    }

    login({username, password}) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (username === correct_username && password === correct_password) {
                    localStorage.setItem('drag-drop-logged-in', "true");
                    return resolve({username, full_name});
                }
                return reject(new Error('Bad username or password'));
            }, 1000);
        })
    }

    logout() {
        localStorage.removeItem('drag-drop-logged-in');
    }
}