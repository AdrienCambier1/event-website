"use client";
import MainTitle from "@/components/titles/main-title";
import Image from "next/image";
import tokyo4k from "@/assets/images/tokyo4k.jpg";
import CustomNav from "@/components/custom-nav";
import { useCity } from "@/contexts/city-context";
import { useParams } from "next/navigation";
import { useCityDetails } from "@/hooks/use-city-details";

export default function VilleLayout({ children }) {
  const { selectedCity } = useCity();
  const { id } = useParams();

  const {
    city: cityData,
    loading: cityLoading,
    error: cityError,
  } = useCityDetails(id);

  const navigation = [
    { name: "Evenements", href: `/villes/${id}/evenements` },
    { name: "Organisateurs", href: `/villes/${id}/organisateurs` },
    { name: "Lieux", href: `/villes/${id}/lieux` },
  ];

  return (
    <main>
      <section className="container items-center">
        {cityLoading ? (
          <>
            <h1 className="skeleton-bg">Une ville</h1>
            <p className="skeleton-bg">
              Découvrez les activités disponibles dans cette ville
            </p>
            <div className="banner skeleton-bg"></div>
          </>
        ) : (
          <>
            <MainTitle title={cityData?.name} />
            <p className="text-center">
              Découvrez les différentes activités disponibles dans la ville de{" "}
              {cityData?.name}.
            </p>
            <Image
              src={cityData?.bannerUrl || tokyo4k}
              alt="City image"
              width={800}
              height={450}
              className="banner"
            />
          </>
        )}

        <CustomNav navigation={navigation} homeLink="/villes" />
      </section>
      {children}
    </main>
  );
}
