export function FaqSection({ faq }: { faq: { q: string; a: string }[] }) {
  if (faq.length === 0) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">FAQ</h2>
      <div className="space-y-3">
        {faq.map((item, i) => (
          <div key={i}>
            <h3 className="font-medium">{item.q}</h3>
            <p className="text-sm text-muted-foreground">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
