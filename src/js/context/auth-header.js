export function authHeader() {
    let jwtToken = localStorage.getItem('tokens');
    if (jwtToken) {
        let s = jwtToken
            .replace('"', '')
            .replace('"', '');
        return {Authorization: 'Bearer ' + s}
    } else {
        return {};
    }
}
