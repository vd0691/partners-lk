export function AuthorizationHeader() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user && user.token ? `Authorization: Token_${user.token}` : {}
}