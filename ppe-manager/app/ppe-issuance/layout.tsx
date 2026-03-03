export default function PPEIssuanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="min-h-screen w-full bg-slate-50">
      {/* This container ensures the form looks good on both wide screens and mobile */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </section>
  );
}