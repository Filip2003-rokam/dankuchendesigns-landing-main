//===================VERSION 3.0
export function createPageUrl(pageName: string) {
    if (!pageName) return '/';
    const [pagePart, hashPart] = pageName.split('#');
    const normalizedPage = pagePart.replace(/^\/+/, '').replace(/ /g, '-');
    const hash = hashPart ? `#${hashPart}` : '';
    return `/${normalizedPage}${hash}`;
}




// ===============UPDATE
// export function createPageUrl(pageName: string) {
//     const [pagePart, hashPart] = pageName.split('#')
//     const normalizedPage = pagePart.replace(/^\/+/, '').replace(/ /g, '-')
//     const hash = hashPart ? `#${hashPart}` : ''
//     return `/${normalizedPage}${hash}`
// }



// ========Original verzija
// export function createPageUrl(pageName: string) {
//     return '/' + pageName.replace(/ /g, '-');
// }