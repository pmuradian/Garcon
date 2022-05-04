
// URL validator for https://buy.am/ urls
export function validateURL(url: string): boolean {
    let result = url.match(/(http(s)?:\/\/.)(www\.)?[buy\.am\/-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);    
    return result != null;
}