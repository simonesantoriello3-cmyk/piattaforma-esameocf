import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/admin', '/quiz', '/risultati', '/profilo'],
    },
    sitemap: 'https://formazioneocf.com/sitemap.xml',
  }
}