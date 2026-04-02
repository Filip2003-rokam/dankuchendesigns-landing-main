import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function DanPrednosti() {
  const benefits = [
    {
      title: "DIAMANT BOJA",
      description: "Novi materijal sa zaštitom od otisaka prstiju i otpornošću na grebanje poseduje antibakterijska svojstva i otporan je na agresivna sredstva.",
      danStandard: "Novi materijal sa zaštitom od otisaka prstiju, grebanja i antibakterijskim svojstvima.",
      marketStandard: "Frontovi lakirani u jednom sloju.",
      danImage: "https://dankuchenmaribor.si/wp-content/uploads/2022/10/DAN_Vorteile.jpg",
      marketImage: "https://dankuchenmaribor.si/wp-content/uploads/2019/04/vorteile_korpus_markt.jpg"
    },
    {
      title: "Dupla sigurnost",
      description: "Zahvaljujući sistemu duplih širih letvi za okačivanje, gornji elementi DAN kuhinja mogu da izdrže više. Zbog toga možete u vašim gornjim elementima čuvati teške servise i posude.",
      danStandard: "Najbolja stabilnost, nosivost i sigurnost.",
      marketStandard: "Samo jedna šina za kačenje!",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_Doppelte_Sicherheit_dan.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_Doppelte_Sicherheit_markt.jpg"
    },
    {
      title: "Veća radna površina",
      description: "Kod DAN-a dobijate 70 cm (dubine) radne površine za istu cenu kao 60 cm (dubine). Ova udobna varijacija sa više prostora vam nudi dodatni radni prostor i još više slobode pri kuvanju.",
      danStandard: "Više slobode kretanja i prostora.",
      marketStandard: "Promena sa 60 cm na 70 cm samo uz doplatu.",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/IMG_3220.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/IMG_3221.jpg"
    },
    {
      title: "Stabilan kuhinjski korpus 18 mm",
      description: "DAN kuhinje obično koriste IZDRŽLJIVIJI KUHINJSKI KORPUS – s debljinom ploče 18 mm, umesto uobičajenih 16 mm. Cena zbog toga nije veća, a doprinosi većoj nosivosti i garantuje dugotrajnost vaše DAN kuhinje.",
      danStandard: "Kuhinjski korpus debljine 18 mm.",
      marketStandard: "Kuhinjski korpus debljine 16 mm",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_stabilkorpus_18mm_dan.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_korpus_16mm_markt.jpg"
    },
    {
      title: "Kompaktne radne ploče",
      description: "Izuzetno otporne na grebanje, udarce, toplotu i rastvarače. Jednostavne za čišćenje, pogodne za kontakt sa hranom i izuzetno trajne. Elegantno rešenje za dug životni vek vaše kuhinje.",
      danStandard: "Izdržljive i otporne ploče.",
      marketStandard: "Osetljive i slabe ploče.",
      danImage: "https://dankuchenmaribor.si/wp-content/uploads/2025/07/250529_Primerjave-01.png",
      marketImage: "https://dankuchenmaribor.si/wp-content/uploads/2025/07/250529_Primerjave-02.png"
    },
    {
      title: "Water Seal Plus zaštita",
      description: "Water Seal Plus zaštita na frontovima za mašine za sudove sprečava prodor vlage i pare i štiti materijal od bubrenja i oštećenja.",
      danStandard: "Zaštita frontova od vlage i pare.",
      marketStandard: "Frontovi neotporni na vlagu, što skraćuje vek trajanja kuhinje. ",
      danImage: "https://dankuchenmaribor.si/wp-content/uploads/2025/07/250529_Primerjave-03-1.png",
      marketImage: "https://dankuchenmaribor.si/wp-content/uploads/2025/07/250529_Primerjave-04.png"
    },
    {
      title: "Kvalitetna iverica",
      description: "Naš dobavljač iverice mora da se prilagodi našim zahtevima. Zbog toga možemo našim klijentima da garantujemo najbolji kvalitet materijala. Naša iverica ima viši pritisak zaptivanja – gustinu od standardnih materijala na tržištu.",
      danStandard: "Samo najbolji kvalitet.",
      marketStandard: "Standardna gruba ploča od iverice.",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_feinspanplatte_dan.jpg.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_feinspanplatte_markt.jpg"
    },
    {
      title: "Fioke sa staklenim nasadama",
      description: "Staklene bočne stranice na fiokama. Za još lepši izgled i individualnost, DAN kuhinje nude staklene bočne stranice na fiokama. Za vas, naravno, BESPLATNO! ",
      danStandard: "Bolji dizajn bez doplate.",
      marketStandard: "Stakleni detalji samo uz doplatu.",
      danImage: "https://dankuchenmaribor.si/wp-content/uploads/2025/07/Andros_23.png",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_glasaufsatz_markt_.jpg"
    },
    {
      title: "UX kuhinjski korpus",
      description: "Kod DAN kuhinja vredi: dobiti više bez doplate! Zato dobijate VEĆI KORPUS (UX – visina) po istoj ceni kao i STANDARDNI KORPUS (U – visina). Za još više prostora za hranu.",
      danStandard: "Više prostora za čuvanje bez doplate.",
      marketStandard: "Više kućište samo uz doplatu.",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_grossraumkorpus_ux_dan.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_korpus_markt.jpg"
    },
    {
      title: "Fioke u podnožju",
      description: "Vaša DAN kuhinja ne sakriva prazan prostor! Kod nas se podnožje kuhinje koristi kao skladišni prostor – fioke u podnožju za 15% više prostora u kuhinji. ",
      danStandard: "Više prostora za čuvanje.",
      marketStandard: "Ne postoji mogućnost montaže fioke u podnožju.",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_grossraumsockelladen_dan.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_sockelladen_markt.jpg"
    },
    {
      title: "Tiho zatvaranje sa Blumotion tehnologijom",
      description: "Zahvaljujući tehnologiji BLUMOTION u vašoj kuhinji neće biti glasnih udaraca kuhinjskih vrata ili fioka, već će biti prijatno glasno samo zbog vašeg kuvanja.",
      danStandard: "BLUMOTION bez doplate.",
      marketStandard: "Nežno zatvaranje moguće samo uz doplatu.",
      danImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_turdampfung_blumotion_dan.jpg",
      marketImage: "https://dankuchen-lokev.si/wp-content/uploads/2019/04/vorteile_turdampfung_markt.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-20 sm:pt-24 pb-12 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-4 sm:mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="italic">Prednosti</span> <span className="font-semibold">DANKÜCHEN</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto px-4">
            Naš standard je vaša prednost! Otkrijte zašto su DAN kuhinje najbolji izbor.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="space-y-12 sm:space-y-16 lg:space-y-24">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-zinc-50 rounded-3xl overflow-hidden"
            >
              {/* Title & Description */}
              <div className="px-6 py-8 sm:px-8 sm:py-10 md:px-12 md:py-12 bg-white">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-zinc-900">
                  {benefit.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-zinc-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* DAN Standard */}
                <div className="relative bg-white p-6 sm:p-8 md:p-10 border-r md:border-r border-b md:border-b-0 border-zinc-200">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-6 h-6 text-[#c8102e]" />
                      <h3 className="text-lg font-bold text-zinc-900">DAN standard</h3>
                    </div>
                    <p className="text-sm text-zinc-600">{benefit.danStandard}</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={benefit.danImage}
                      alt="DAN standard"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>

                {/* Market Standard */}
                <div className="relative bg-zinc-50 p-6 sm:p-8 md:p-10">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-zinc-500 mb-3">Standard na tržištu </h3>
                    <p className="text-sm text-zinc-500">{benefit.marketStandard}</p>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg opacity-70">
                    <img
                      src={benefit.marketImage}
                      alt="Standard na tržištu "
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-24"
        >
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Najbolja odluka pri kupovini kuhinja!
          </h2>
          <p className="text-lg text-zinc-600 mb-8">
            Uverite se u kvalitet DANKÜCHEN kuhinja i rezervišite besplatno savetovanje.
          </p>
        </motion.div>
      </div>
    </div>
  );
}