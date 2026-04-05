import React from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { listPublishedBlogPosts } from '@/api/supabaseData';
import { useQuery } from '@tanstack/react-query';

export default function BlogSection() {
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => listPublishedBlogPosts(3),
  });

  if (isLoading) {
    return null;
  }
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] text-zinc-500 mb-4 uppercase">Blog</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light" style={{ fontFamily: 'Georgia, serif' }}>
            Aktuelne vesti iz DANKÜCHEN-a
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg mb-4">
                <img
                  src={post.slika_url}
                  alt={post.naslov}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center text-sm text-zinc-500 mb-3">
                <Calendar className="w-4 h-4 mr-2" />
                <time>{new Date(post.datum).toLocaleDateString('sr-RS')}</time>
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-[#c8102e] transition-colors">
                {post.naslov}
              </h3>
              <p className="text-zinc-600 leading-relaxed">{post.kratak_opis}</p>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            className="border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white uppercase tracking-wider"
            onClick={() => window.location.href = '/blog'}
          >
            Pročitajte više
          </Button>
        </div>
      </div>
    </section>
  );
}