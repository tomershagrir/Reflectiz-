import { Request, Response } from 'express';

export function verifyDomainName(req: Request, res: Response, next): void {
    const domainName: string = req.query.domain as string;
    if (/^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/.test(domainName)) {
        next();
    }
    else {
        res.status(400).send("Domain name is illegal");
    }
}