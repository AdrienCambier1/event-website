import MainTitle from "@/components/titles/main-title";

export default function LieuxPage() {
  return (
    <main>
      <section className="container items-center">
        <MainTitle title={`Les lieux événementielles`} />
        <p className="text-center">
          Découvrez tous les lieux où se déroulent les événements.
        </p>
      </section>
    </main>
  );
}
