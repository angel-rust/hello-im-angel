import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = getSortedPostsData();

  return (
    <div className="min-h-screen bg-black text-neutral px-6 pt-24 pb-12 md:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-accent-blue hover:text-accent-blue/80 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-4 text-white">
            <span className="text-accent-blue">Blog</span> & Articles
          </h1>
          <p className="text-xl text-neutral/80">
            Thoughts on development, design, and technology
          </p>
        </div>

        {/* Blog Posts */}
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral/60 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-black/40 border border-accent-blue/20 rounded-xl p-8 hover:border-accent-blue/40 hover:shadow-glow-sm transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="flex flex-col gap-4">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-neutral/60">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <time>{new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</time>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-white group-hover:text-accent-blue transition-colors">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-neutral/80 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm bg-accent-blue/10 text-accent-blue border border-accent-blue/30 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex items-center text-accent-blue font-semibold group-hover:gap-3 gap-2 transition-all mt-2">
                      Read article <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
