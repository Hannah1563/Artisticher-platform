import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      home: "Home",
      artists: "Artists",
      gallery: "Gallery",
      learnArt: "Learn Art",
      events: "Events",
      editBio: "Edit Bio",
      logout: "Logout",
      login: "Login",
      register: "Register",

      // Home Hero
      "home.hero.title": "Discover Amazing African Art",
      "home.hero.subtitle": "Connect with talented artists and find unique artworks",
      "home.hero.browseGallery": "Browse Gallery",
      "home.hero.registerArtist": "Register as Artist",

      // Why Choose
      "home.whyChoose": "Why Choose Artisticher?",

      // Features
      "home.features.discover.title": "Discover Talent",
      "home.features.discover.desc": "Browse through hundreds of talented artists from around the world",
      "home.features.unique.title": "Unique Artworks",
      "home.features.unique.desc": "Find one-of-a-kind pieces that speak to your style",
      "home.features.events.title": "Art Events",
      "home.features.events.desc": "Stay updated with the latest exhibitions and art events",

      // CTA
      "home.cta.title": "Ready to Start Your Journey?",
      "home.cta.subtitle": "Join our community of artists and art enthusiasts today",
      "home.cta.registerArtist": "Register as Artist",
      "home.cta.exploreGallery": "Browse Gallery",

      // Gallery
      "gallery.title": "Art Gallery",
      "gallery.subtitle": "Search artworks, artists...",
      "artists.title": "Artists",
      "artists.subtitle": "Browse through amazing artists from around the world",
      "events.title": "Events",
      "events.subtitle": "Stay updated with the latest exhibitions and art events",
      "learnArt.subtitle": "Find resources and tutorials to improve your art skills.",
    }
  },
  fr: {
    translation: {
      home: "Accueil",
      artists: "Artistes",
      gallery: "Galerie",
      learnArt: "Apprendre l'art",
      events: "Événements",
      editBio: "Modifier Bio",
      logout: "Déconnexion",
      login: "Connexion",
      register: "S'inscrire",

      "home.hero.title": "Découvrez l'art africain incroyable",
      "home.hero.subtitle": "Connectez-vous avec des artistes talentueux et trouvez des œuvres uniques",
      "home.hero.browseGallery": "Voir la galerie",
      "home.hero.registerArtist": "S'inscrire comme artiste",

      "home.whyChoose": "Pourquoi choisir Artisticher ?",

      "home.features.discover.title": "Découvrir des talents",
      "home.features.discover.desc": "Parcourez des centaines d'artistes talentueux du monde entier",
      "home.features.unique.title": "Œuvres uniques",
      "home.features.unique.desc": "Trouvez des pièces uniques qui correspondent à votre style",
      "home.features.events.title": "Événements artistiques",
      "home.features.events.desc": "Restez informé des dernières expositions et événements artistiques",

      "home.cta.title": "Prêt à commencer votre aventure ?",
      "home.cta.subtitle": "Rejoignez notre communauté d'artistes et d'amateurs d'art dès aujourd'hui",
      "home.cta.registerArtist": "S'inscrire comme artiste",
      "home.cta.exploreGallery": "Voir la galerie",

      // Gallery
      "gallery.title": "Art Gallery",
      "gallery.subtitle": "Search artworks, artists...",
      "artists.title": "Artists",
      "artists.subtitle": "Browse through amazing artists from around the world",
      "events.title": "Events",
      "events.subtitle": "Stay updated with the latest exhibitions and art events",
      "learnArt.subtitle": "Find resources and tutorials to improve your art skills.",
    }
  },
  rw: {
    translation: {
      home: "Ahabanza",
      artists: "Abahanzi",
      gallery: "Inzu y'Ubugeni",
      learnArt: "Kwiga Ubugeni",
      events: "Ibikorwa",
      editBio: "Hindura Bio",
      logout: "Sohoka",
      login: "Injira",
      register: "Iyandikishe",

      "home.hero.title": "Menya Ubugeni Bwiza bwa Afurika",
      "home.hero.subtitle": "Hura n'abahanzi b'abahanga ubone ibihangano byihariye",
      "home.hero.browseGallery": "Reba Inzu y'Ubugeni",
      "home.hero.registerArtist": "Iyandikishe nk'umuhanzi",

      "home.whyChoose": "Impamvu wahitamo Artisticher?",

      "home.features.discover.title": "Menya Impano",
      "home.features.discover.desc": "Reba abahanzi b'abahanga baturutse impande zose z'isi",
      "home.features.unique.title": "Ibihangano Byihariye",
      "home.features.unique.desc": "Shaka ibihangano byihariye bihuye n'uburyo bwawe",
      "home.features.events.title": "Ibikorwa by'Ubugeni",
      "home.features.events.desc": "Menya amakuru agezweho ku imurikabikorwa n'ibindi bikorwa by'ubugeni",

      "home.cta.title": "Witeguye Gutangira Urugendo rwawe?",
      "home.cta.subtitle": "Jya mu muryango w'abahanzi n'abakunzi b'ubugeni uyu munsi",
      "home.cta.registerArtist": "Iyandikishe nk'umuhanzi",
      "home.cta.exploreGallery": "Reba Inzu y'Ubugeni",

      // Gallery
      "gallery.title": "Art Gallery",
      "gallery.subtitle": "Search artworks, artists...",
      "artists.title": "Artists",
      "artists.subtitle": "Browse through amazing artists from around the world",
      "events.title": "Events",
      "events.subtitle": "Stay updated with the latest exhibitions and art events",
      "learnArt.subtitle": "Find resources and tutorials to improve your art skills.",
    }
  },
  sw: {
    translation: {
      home: "Nyumbani",
      artists: "Wasanii",
      gallery: "Matunzio",
      learnArt: "Jifunze Sanaa",
      events: "Matukio",
      editBio: "Hariri Bio",
      logout: "Toka",
      login: "Ingia",
      register: "Jisajili",

      "home.hero.title": "Gundua Sanaa ya Ajabu ya Afrika",
      "home.hero.subtitle": "Ungana na wasanii wenye vipaji na upate kazi za kipekee",
      "home.hero.browseGallery": "Tazama Matunzio",
      "home.hero.registerArtist": "Jisajili kama Msanii",

      "home.whyChoose": "Kwa nini uchague Artisticher?",

      "home.features.discover.title": "Gundua Vipaji",
      "home.features.discover.desc": "Chunguza wasanii wenye vipaji kutoka kote duniani",
      "home.features.unique.title": "Kazi za Sanaa za Kipekee",
      "home.features.unique.desc": "Pata kazi za kipekee zinazolingana na mtindo wako",
      "home.features.events.title": "Matukio ya Sanaa",
      "home.features.events.desc": "Baki na taarifa kuhusu maonyesho na matukio ya sanaa",

      "home.cta.title": "Tayari Kuanza Safari Yako?",
      "home.cta.subtitle": "Jiunge na jamii yetu ya wasanii na wapenzi wa sanaa leo",
      "home.cta.registerArtist": "Jisajili kama Msanii",
      "home.cta.exploreGallery": "Tazama Matunzio",

      // Gallery
      "gallery.title": "Art Gallery",
      "gallery.subtitle": "Search artworks, artists...",
      "artists.title": "Artists",
      "artists.subtitle": "Browse through amazing artists from around the world",
      "events.title": "Events",
      "events.subtitle": "Stay updated with the latest exhibitions and art events",
      "learnArt.subtitle": "Find resources and tutorials to improve your art skills.",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('lang') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;