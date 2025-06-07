import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const formats = defineCollection({
	loader: glob({ base: './src/content/formats', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    logo: z.string().optional(),
    highres: z.boolean().optional(),
    sampleFrequency: z.string().optional(),
    bitDepth: z.string().optional(),
    bitRate: z.string().optional(),
    compression: z.string().optional(),
    fileFormats: z.array(z.string()).optional(),
    streaming: z.array(z.string()).optional(),
    streamingIcon: z.string().optional(),
    audiophileLevel: z.string().optional(),
    draft: z.boolean().optional(),
  }),
});

export const collections = { formats };
