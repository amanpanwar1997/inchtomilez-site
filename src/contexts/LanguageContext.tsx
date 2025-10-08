import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es' | 'fr' | 'de';

interface Translations {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      blogs: 'Blog',
      contact: 'Contact',
      admin: 'Admin'
    },
    hero: {
      title: 'Transform Your Digital Presence',
      subtitle: '360° Digital Marketing + IT + Media Solutions',
      cta: 'Get Started',
      learnMore: 'Learn More'
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive digital solutions for your business',
      viewAll: 'View All Services'
    },
    about: {
      title: 'About Us',
      subtitle: 'Your trusted partner in digital transformation'
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let\'s discuss your project',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      message: 'Message',
      send: 'Send Message'
    },
    footer: {
      company: 'Company',
      services: 'Services',
      resources: 'Resources',
      contact: 'Contact',
      rights: 'All rights reserved',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service'
    },
    blog: {
      readMore: 'Read More',
      readingTime: 'min read',
      publishedOn: 'Published on',
      by: 'by',
      categories: 'Categories',
      tags: 'Tags',
      share: 'Share',
      comments: 'Comments',
      relatedPosts: 'Related Posts',
      tableOfContents: 'Table of Contents',
      searchPlaceholder: 'Search articles...',
      filterBy: 'Filter by',
      allCategories: 'All Categories'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      close: 'Close',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      back: 'Back'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      services: 'Servicios',
      portfolio: 'Portafolio',
      blogs: 'Blog',
      contact: 'Contacto',
      admin: 'Admin'
    },
    hero: {
      title: 'Transforma Tu Presencia Digital',
      subtitle: 'Soluciones 360° de Marketing Digital + IT + Media',
      cta: 'Comenzar',
      learnMore: 'Más Información'
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones digitales integrales para su negocio',
      viewAll: 'Ver Todos los Servicios'
    },
    about: {
      title: 'Sobre Nosotros',
      subtitle: 'Tu socio de confianza en transformación digital'
    },
    contact: {
      title: 'Contáctanos',
      subtitle: 'Hablemos de tu proyecto',
      name: 'Nombre',
      email: 'Correo',
      phone: 'Teléfono',
      message: 'Mensaje',
      send: 'Enviar Mensaje'
    },
    footer: {
      company: 'Empresa',
      services: 'Servicios',
      resources: 'Recursos',
      contact: 'Contacto',
      rights: 'Todos los derechos reservados',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio'
    },
    blog: {
      readMore: 'Leer Más',
      readingTime: 'min de lectura',
      publishedOn: 'Publicado el',
      by: 'por',
      categories: 'Categorías',
      tags: 'Etiquetas',
      share: 'Compartir',
      comments: 'Comentarios',
      relatedPosts: 'Artículos Relacionados',
      tableOfContents: 'Tabla de Contenidos',
      searchPlaceholder: 'Buscar artículos...',
      filterBy: 'Filtrar por',
      allCategories: 'Todas las Categorías'
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      close: 'Cerrar',
      cancel: 'Cancelar',
      save: 'Guardar',
      delete: 'Eliminar',
      edit: 'Editar',
      view: 'Ver',
      back: 'Volver'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      services: 'Services',
      portfolio: 'Portfolio',
      blogs: 'Blog',
      contact: 'Contact',
      admin: 'Admin'
    },
    hero: {
      title: 'Transformez Votre Présence Numérique',
      subtitle: 'Solutions 360° Marketing Digital + IT + Médias',
      cta: 'Commencer',
      learnMore: 'En Savoir Plus'
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Solutions numériques complètes pour votre entreprise',
      viewAll: 'Voir Tous les Services'
    },
    about: {
      title: 'À Propos',
      subtitle: 'Votre partenaire de confiance en transformation numérique'
    },
    contact: {
      title: 'Contactez-Nous',
      subtitle: 'Discutons de votre projet',
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      message: 'Message',
      send: 'Envoyer le Message'
    },
    footer: {
      company: 'Entreprise',
      services: 'Services',
      resources: 'Ressources',
      contact: 'Contact',
      rights: 'Tous droits réservés',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d\'Utilisation'
    },
    blog: {
      readMore: 'Lire Plus',
      readingTime: 'min de lecture',
      publishedOn: 'Publié le',
      by: 'par',
      categories: 'Catégories',
      tags: 'Tags',
      share: 'Partager',
      comments: 'Commentaires',
      relatedPosts: 'Articles Connexes',
      tableOfContents: 'Table des Matières',
      searchPlaceholder: 'Rechercher des articles...',
      filterBy: 'Filtrer par',
      allCategories: 'Toutes les Catégories'
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      close: 'Fermer',
      cancel: 'Annuler',
      save: 'Enregistrer',
      delete: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      back: 'Retour'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      about: 'Über Uns',
      services: 'Dienstleistungen',
      portfolio: 'Portfolio',
      blogs: 'Blog',
      contact: 'Kontakt',
      admin: 'Admin'
    },
    hero: {
      title: 'Transformieren Sie Ihre Digitale Präsenz',
      subtitle: '360° Digital Marketing + IT + Media Lösungen',
      cta: 'Loslegen',
      learnMore: 'Mehr Erfahren'
    },
    services: {
      title: 'Unsere Dienstleistungen',
      subtitle: 'Umfassende digitale Lösungen für Ihr Unternehmen',
      viewAll: 'Alle Dienstleistungen'
    },
    about: {
      title: 'Über Uns',
      subtitle: 'Ihr vertrauenswürdiger Partner für digitale Transformation'
    },
    contact: {
      title: 'Kontaktieren Sie Uns',
      subtitle: 'Lassen Sie uns über Ihr Projekt sprechen',
      name: 'Name',
      email: 'E-Mail',
      phone: 'Telefon',
      message: 'Nachricht',
      send: 'Nachricht Senden'
    },
    footer: {
      company: 'Unternehmen',
      services: 'Dienstleistungen',
      resources: 'Ressourcen',
      contact: 'Kontakt',
      rights: 'Alle Rechte vorbehalten',
      privacy: 'Datenschutz',
      terms: 'Nutzungsbedingungen'
    },
    blog: {
      readMore: 'Mehr Lesen',
      readingTime: 'Min. Lesezeit',
      publishedOn: 'Veröffentlicht am',
      by: 'von',
      categories: 'Kategorien',
      tags: 'Tags',
      share: 'Teilen',
      comments: 'Kommentare',
      relatedPosts: 'Verwandte Beiträge',
      tableOfContents: 'Inhaltsverzeichnis',
      searchPlaceholder: 'Artikel suchen...',
      filterBy: 'Filtern nach',
      allCategories: 'Alle Kategorien'
    },
    common: {
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      close: 'Schließen',
      cancel: 'Abbrechen',
      save: 'Speichern',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      view: 'Ansehen',
      back: 'Zurück'
    }
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Load saved language preference
  useEffect(() => {
    const saved = localStorage.getItem('inchtomilez-language') as Language;
    if (saved && ['en', 'es', 'fr', 'de'].includes(saved)) {
      setLanguageState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (['en', 'es', 'fr', 'de'].includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('inchtomilez-language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const availableLanguages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' }
  ];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}