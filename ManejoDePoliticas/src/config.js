import * as url from 'url';
export const config={
    SERVER:'customRoutes',
    DIRNAME: url.fileURLToPath(new URL('.', import.meta.url)),
    get VIEWS_DIR() { return `${this.DIRNAME}/views` },
}