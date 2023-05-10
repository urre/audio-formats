import { defineCollection, z } from "astro:content";

const formats = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    logo: z.string().optional(),
    highres: z.string().optional(),
    sampleFrequency: z.string().optional(),
    bitDepth: z.string().optional(),
    bitRate: z.string().optional(),
    compression: z.string().optional(),
    fileFormats: z.string().optional(),
    streaming: z.array(z.string()),
    audiophileLevel: z.string().optional()
  })
});

export const collections = { formats };
