import { useEffect } from 'react';

interface OrganizationSchema {
  type: 'organization';
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: {
    telephone: string;
    contactType: string;
    email: string;
  };
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  sameAs: string[];
}

interface LocalBusinessSchema {
  type: 'localBusiness';
  name: string;
  image: string;
  description: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  telephone: string;
  email: string;
  priceRange: string;
  openingHours: string[];
}

interface ServiceSchema {
  type: 'service';
  name: string;
  description: string;
  provider: string;
  serviceType: string;
  areaServed: string;
}

interface BreadcrumbSchema {
  type: 'breadcrumb';
  items: Array<{
    name: string;
    url: string;
  }>;
}

interface FAQSchema {
  type: 'faq';
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

interface ReviewSchema {
  type: 'review';
  itemReviewed: string;
  ratingValue: number;
  bestRating: number;
  reviewCount: number;
}

type SchemaType = 
  | OrganizationSchema 
  | LocalBusinessSchema 
  | ServiceSchema 
  | BreadcrumbSchema 
  | FAQSchema
  | ReviewSchema;

interface StructuredDataProps {
  schema: SchemaType;
}

export function StructuredData({ schema }: StructuredDataProps) {
  useEffect(() => {
    let jsonLd: any = {};

    switch (schema.type) {
      case 'organization':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: schema.name,
          description: schema.description,
          url: schema.url,
          logo: {
            '@type': 'ImageObject',
            url: schema.logo
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: schema.contactPoint.telephone,
            contactType: schema.contactPoint.contactType,
            email: schema.contactPoint.email,
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi']
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: schema.address.streetAddress,
            addressLocality: schema.address.addressLocality,
            addressRegion: schema.address.addressRegion,
            postalCode: schema.address.postalCode,
            addressCountry: schema.address.addressCountry
          },
          sameAs: schema.sameAs
        };
        break;

      case 'localBusiness':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': 'https://inchtomilez.com',
          name: schema.name,
          image: schema.image,
          description: schema.description,
          address: {
            '@type': 'PostalAddress',
            streetAddress: schema.address.streetAddress,
            addressLocality: schema.address.addressLocality,
            addressRegion: schema.address.addressRegion,
            postalCode: schema.address.postalCode,
            addressCountry: schema.address.addressCountry
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: schema.geo.latitude,
            longitude: schema.geo.longitude
          },
          telephone: schema.telephone,
          email: schema.email,
          priceRange: schema.priceRange,
          openingHoursSpecification: schema.openingHours.map(hours => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: hours.split(':')[0],
            opens: hours.split(':')[1]?.split('-')[0],
            closes: hours.split(':')[1]?.split('-')[1]
          }))
        };
        break;

      case 'service':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'Service',
          serviceType: schema.serviceType,
          name: schema.name,
          description: schema.description,
          provider: {
            '@type': 'Organization',
            name: schema.provider
          },
          areaServed: {
            '@type': 'City',
            name: schema.areaServed
          }
        };
        break;

      case 'breadcrumb':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: schema.items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };
        break;

      case 'faq':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: schema.questions.map(qa => ({
            '@type': 'Question',
            name: qa.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: qa.answer
            }
          }))
        };
        break;

      case 'review':
        jsonLd = {
          '@context': 'https://schema.org',
          '@type': 'AggregateRating',
          itemReviewed: {
            '@type': 'Organization',
            name: schema.itemReviewed
          },
          ratingValue: schema.ratingValue,
          bestRating: schema.bestRating,
          ratingCount: schema.reviewCount
        };
        break;
    }

    // Create or update script tag
    const scriptId = `structured-data-${schema.type}`;
    let script = document.getElementById(scriptId);
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(jsonLd);

    // Cleanup function
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [schema]);

  return null;
}

// Export helper to create organization schema
export const createOrganizationSchema = (): OrganizationSchema => ({
  type: 'organization',
  name: 'InchToMilez - Digital Marketing Agency Indore',
  description: 'Award-winning digital marketing agency in Indore specializing in SEO, website development, branding, and comprehensive digital solutions.',
  url: 'https://inchtomilez.com',
  logo: 'https://inchtomilez.com/logo.png',
  contactPoint: {
    telephone: '+91-731-XXXXXXX',
    contactType: 'Customer Service',
    email: 'hello@inchtomilez.com'
  },
  address: {
    streetAddress: 'Your Office Address',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452001',
    addressCountry: 'IN'
  },
  sameAs: [
    'https://facebook.com/inchtomilez',
    'https://twitter.com/inchtomilez',
    'https://linkedin.com/company/inchtomilez',
    'https://instagram.com/inchtomilez'
  ]
});

// Export helper to create local business schema
export const createLocalBusinessSchema = (): LocalBusinessSchema => ({
  type: 'localBusiness',
  name: 'InchToMilez - Digital Marketing Agency',
  image: 'https://inchtomilez.com/office-image.jpg',
  description: 'Leading digital marketing agency in Indore offering SEO, PPC, social media marketing, website development, and branding services.',
  address: {
    streetAddress: 'Your Office Address',
    addressLocality: 'Indore',
    addressRegion: 'Madhya Pradesh',
    postalCode: '452001',
    addressCountry: 'IN'
  },
  geo: {
    latitude: 22.7196,
    longitude: 75.8577
  },
  telephone: '+91-731-XXXXXXX',
  email: 'hello@inchtomilez.com',
  priceRange: '$$',
  openingHours: [
    'Monday:09:00-18:00',
    'Tuesday:09:00-18:00',
    'Wednesday:09:00-18:00',
    'Thursday:09:00-18:00',
    'Friday:09:00-18:00',
    'Saturday:09:00-14:00'
  ]
});