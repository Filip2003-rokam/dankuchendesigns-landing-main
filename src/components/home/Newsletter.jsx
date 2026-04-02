import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function Newsletter() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await base44.entities.NewsletterSubscription.create({
        ime: firstName,
        prezime: lastName,
        email: email,
        status: 'aktivan'
      });
      toast.success('Uspešno ste se prijavili za novosti!');
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      toast.error('Došlo je do greške. Pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#8b9c8e]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light italic mb-6 text-white" style={{ fontFamily: 'Georgia, serif' }}>
            Prijavite se za novosti
          </h2>
          <p className="text-white mb-8 sm:mb-10 text-sm sm:text-base">
            Prijavite se za naše vesti i ostanite u toku sa svim novostima.
          </p>

          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              <Input
                type="text"
                placeholder="Ime"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="px-4 py-3 text-sm bg-white"
              />
              <Input
                type="text"
                placeholder="Prezime"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="px-4 py-3 text-sm bg-white"
              />
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="px-4 py-3 text-sm bg-white"
              />
            </div>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="bg-[#c8102e] hover:bg-[#a00d26] text-white px-8 sm:px-12 py-3 text-xs sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.2em] font-semibold w-full sm:w-auto disabled:opacity-50"
            >
              {isSubmitting ? 'Šalje se...' : 'Prijavite se'}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}