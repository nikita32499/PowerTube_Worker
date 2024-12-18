import { z } from 'zod';

export const Config = z
    .object({
        WORKER_AUTH_TOKEN: z.string(),
        POSTGRES_HOST: z.string(),
        POSTGRES_PORT: z.number(),
        POSTGRES_USER: z.string(),
        POSTGRES_PASSWORD: z.string(),
        POSTGRES_DATABASE: z.string(),
        NODE_MODE: z.enum(['dev', 'build', 'prod']),
    })
    .catch((error) => {
        console.error(error.error.errors, 'Error parsing config');
        process.exit(1);
    })
    .parse({
        ...process.env,
        POSTGRES_PORT: parseInt(process.env['POSTGRES_PORT']!),
    });
