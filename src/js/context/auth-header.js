export function authHeader() {
    console.log(localStorage.getItem('tokens'));
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
