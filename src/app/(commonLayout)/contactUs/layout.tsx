export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center px-4 py-8 gap-8 md:py-12 md:px-6 lg:px-8">
      <div className="w-full text-center">{children}</div>
    </section>
  );
}
