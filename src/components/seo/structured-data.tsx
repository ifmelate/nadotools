interface Props {
  seo: { h1: string; description: string; howItWorks: string[] };
}

export function StructuredData({ seo }: Props) {
  const schema = {
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
