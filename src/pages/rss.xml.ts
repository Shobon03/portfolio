import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getCollection('blog');
  const base = import.meta.env.BASE_URL;

  // CORREÇÃO AQUI:
  // Se context.site for undefined (comum em dev), usamos o env SITE.
  // Se ainda assim falhar, usamos o localhost como último recurso.
  const site = context.site ?? import.meta.env.SITE ?? 'http://localhost:4321';

  return rss({
    title: 'Matheus.Dev | Blog',
    description: 'Desenvolvimento Full-Stack, Linux e Retro Gaming.',

    // Agora passamos a variável 'site' que garantimos ter um valor acima
    site: site,

    items: posts.map((post) => {
      // Garante que o link não tenha barras duplas (//)
      const itemLink = `${base}blog/${post.slug}/`.replace(/\/+/g, '/');

      return {
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: itemLink,
      };
    }),
    customData: `<language>pt-br</language>`,
  });
};
