interface Props {
  seo: {
    h1: string;
    description: string;
    howItWorks: string[];
    faq: { q: string; a: string }[];
  };
}

export function StructuredData({ seo }: Props) {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: seo.h1,
    description: seo.description,
    step: seo.howItWorks.map((text, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      text,
    })),
  };

  const faqSchema =
    seo.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: seo.faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.a,
            },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}
