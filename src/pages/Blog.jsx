import React from 'react';
import { listPublishedBlogPosts } from '@/api/supabaseData';
import { useQuery } from '@tanstack/react-query';
import { Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Blog() {
  const { data: blogPosts = [], isLoading } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: () => listPublishedBlogPosts(),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Loader2 className="w-8 h-8 animate-spin text-[#c8102e]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs sm:text-sm tracking-[0.3em] text-zinc-500 mb-4 uppercase">Blog</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Aktuelne vesti iz <span className="italic">DANKÜCHEN-a</span>
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Pratite najnovije vesti, savete i inspiraciju iz sveta kuhinja
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        {blogPosts.length === 0 ? (
          <div className="text-center py-16 text-zinc-500">
            Trenutno nema objavljenih postova
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl mb-4">
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
                <h2 className="text-2xl font-semibold mb-3 group-hover:text-[#c8102e] transition-colors">
                  {post.naslov}
                </h2>
                <p className="text-zinc-600 leading-relaxed mb-4">{post.kratak_opis}</p>
                <div className="prose prose-zinc max-w-none">
                  <p className="text-zinc-700 whitespace-pre-line">{post.sadrzaj}</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}