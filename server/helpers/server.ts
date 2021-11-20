import { IncomingMessage } from 'http';

export function usePath(req: IncomingMessage): string {
    return req.url?.toString()?.split('?')[0]?.replace(/(.+)\/$/, '$1') ?? '/';
}

export function matchPath(req: IncomingMessage, path: string): boolean {
    return new RegExp(`^${path.replace('/', '\/')}$`).test(usePath(req));
}