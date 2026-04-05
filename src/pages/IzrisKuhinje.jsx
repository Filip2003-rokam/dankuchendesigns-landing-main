import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createKitchenRequest } from '@/api/supabaseData';

export default function IzrisKuhinje() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    shape: '',
    handleStyle: '',
    style: '',
    finish: '',
    budget: '',
    delivery: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const steps = [
    {
      question: "Koju formu DAN kuhinje želite?",
      field: "shape",
      options: [
        { value: "ravna", label: "RAVNOG OBLIKA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/1_Form_Kuechenzeile_planer_dankuechen_web.jpg" },
        { value: "l-oblika", label: "L-OBLIKA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/2_Form_L-Form_planer_dankuechen_web.jpg" },
        { value: "u-oblika", label: "U-OBLIKA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/3_Form_U-Form_planer_dankuechen_web.jpg" },
        { value: "otok", label: "KUHINJSKO OSTRVO", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/4_Form_Freistehende-Insel_planer_dankuechen_web.jpg" }
      ]
    },
    {
      question: "O kakvoj DAN kuhinji sanjate?",
      field: "handleStyle",
      options: [
        { value: "brezrocajna", label: "BEZ RUČICA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/1_Art_Grifflose_planer_dankuechen_web.jpg" },
        { value: "rocajna", label: "SA RUČICAMA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/2_Art_mit_Griffen_planer_dankuechen_web.jpg" },
        { value: "ne-vem", label: "NISAM SIGURAN", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Weiss-ich-nicht_web.jpg" }
      ]
    },
    {
      question: "Koji stil kuhinje vam odgovara?",
      field: "style",
      options: [
        { value: "moderna", label: "MODERNA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/1_Stil_modern_planer_dankuechen_web.jpg" },
        { value: "klasicna", label: "KLASIČNA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/2_Stil_klassisch_planer_dankuechen_web.jpg" },
        { value: "ne-vem", label: "NISAM SIGURAN", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Weiss-ich-nicht_web.jpg" }
      ]
    },
    {
      question: "Kakve kuhinjske frontove želite?",
      field: "finish",
      options: [
        { value: "visok-sijaj", label: "VISOKI SJAJ", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/original_05x_q_4_1.jpg" },
        { value: "mat", label: "MAT", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Matt.jpg" },
        { value: "dekor", label: "DEKOR", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Dekor.jpg" },
        { value: "ne-vem", label: "NISAM SIGURAN", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner_Weiss-ich-nicht_web.jpg" }
      ]
    },
    {
      question: "Koliko ste spremni da izdvojite za novu kuhinju?",
      field: "budget",
      options: [
        { value: "4-7k", label: "Od 4.000 do 7.000 EUR", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Silbermond-Jasmin-Ulme-fin.jpg" },
        { value: "7-10k", label: "Od 7.000 do 10.000 EUR", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Burguesa-Weiss-sevilla.RGB_color-fin_2.jpg" },
        { value: "11k+", label: "Od 11.000 EUR na više", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/All-inklusive-Silbermond-Jasmin-Alfabia-Cerros-mit-Frau_sRGB.jpg" }
      ]
    },
    {
      question: "Kada biste želeli da se kuhinja dostavi?",
      field: "delivery",
      options: [
        { value: "2-4", label: "2–4 MESECA", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner-01.jpg" },
        { value: "4-6", label: "4–6 MESECI", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner-02.jpg" },
        { value: "6+", label: "KASNIJE OD 6 MESECI", image: "https://dankuchenmaribor.si/wp-content/themes/dankuchen/assets/images/form/Dankuechen_Kuechenplaner-03.jpg" }
      ]
    }
  ];

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setTimeout(() => {
      if (step < steps.length) {
        setStep(step + 1);
      }
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createKitchenRequest({
        ime: formData.firstName,
        prezime: formData.lastName,
        email: formData.email,
        telefon: formData.phone,
        tip_kuhinje: formData.shape,
        stil_kuhinje: formData.style,
        boja_prednost: formData.handleStyle,
        budzet: formData.budget,
        dodatne_napomene: `Željena dostava: ${formData.delivery}. Newsletter: ${formData.newsletter ? 'Da' : 'Ne'}.`,
        status: 'novi'
      });
      setSubmitted(true);
    } catch (error) {
      console.error('Greška pri slanju zahteva:', error);
      alert('Došlo je do greške. Molimo pokušajte ponovo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStep = steps[step];
  const progress = ((step + 1) / (steps.length + 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6 px-4" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="italic">Planiranje</span> <span className="font-semibold">kuhinje</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 px-4">
            Zakažite termin za BESPLATNO savetovanje i 3D projektovanje u DANKÜCHEN studiju.
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-2 bg-zinc-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#c8102e]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-sm text-zinc-500 mt-2 text-center">
            Korak {step + 1} od {steps.length + 1}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {submitted ? (
            /* Success Message */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl p-12 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-light mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                Hvala na upitu!
              </h2>
              <p className="text-lg text-zinc-600 mb-8">
                Vaš zahtev je uspešno poslat. Kontaktiraćemo vas u najkraćem roku.
              </p>
              <Button
                onClick={() => window.location.href = '/'}
                className="bg-[#c8102e] hover:bg-[#a00d26] px-8"
              >
                Nazad na početnu
              </Button>
            </motion.div>
          ) : step < steps.length ? (
            /* Question Steps */
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 text-zinc-900">
                {currentStep.question}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentStep.options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => handleOptionSelect(currentStep.field, option.value)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${formData[currentStep.field] === option.value
                      ? 'border-[#c8102e] shadow-lg'
                      : 'border-zinc-200 hover:border-zinc-300'
                      }`}
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={option.image}
                        alt={option.label}
                        className="w-full h-full object-cover"
                      />
                      {formData[currentStep.field] === option.value && (
                        <div className="absolute inset-0 bg-[#c8102e]/20 flex items-center justify-center">
                          <div className="w-12 h-12 bg-[#c8102e] rounded-full flex items-center justify-center">
                            <Check className="w-6 h-6 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-white">
                      <p className="text-sm font-semibold text-zinc-900 tracking-wide">
                        {option.label}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation */}
              <div className="flex justify-between mt-10">
                <Button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  variant="outline"
                  className="px-8"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Nazad
                </Button>
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!formData[currentStep.field]}
                  className="bg-[#c8102e] hover:bg-[#a00d26] px-8"
                >
                  Dalje
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Contact Form */
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 md:p-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-6 sm:mb-8 text-zinc-900">
                Obezbedite svoju ponudu iz snova bez obaveze.
              </h2>

              <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    placeholder="Ime"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                    className="px-4 py-3"
                  />
                  <Input
                    type="text"
                    placeholder="Prezime"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                    className="px-4 py-3"
                  />
                </div>

                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="px-4 py-3"
                />

                <Input
                  type="tel"
                  placeholder="Telefon"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="px-4 py-3"
                />

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
                    className="mt-1"
                  />
                  <label className="text-sm text-zinc-600">
                    Želim da se prijavim na sve novosti i savete i želim biti obavešten/a o ekskluzivnim ponudama.
                  </label>
                </div>

                <div className="flex justify-between mt-10">
                  <Button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    className="px-8"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Nazad
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#c8102e] hover:bg-[#a00d26] px-12 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Šalje se...' : 'Pošalji'}
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}