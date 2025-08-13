"use client";
import MainTitle from "@/components/titles/main-title";
import Image from "next/image";
import tokyo4k from "@/assets/images/tokyo4k.jpg";
import CustomNav from "@/components/custom-nav";
import { useParams } from "next/navigation";
import { usePlaceDetails } from "@/hooks/use-place-details";

export default function LieuLayout({ children }) {
  const { id } = useParams();

  const {
    place: placeData,
    loading: placeLoading,
    error: placeError,
  } = usePlaceDetails(id);

  const navigation = [
    { name: "Evenements", href: `/lieux/${id}/evenements` },
    { name: "Organisateurs", href: `/lieux/${id}/organisateurs` },
  ];

  return (
    <main>
      <section className="container items-center">
        {placeLoading ? (
          <>
            <h1 className="skeleton-bg">Un lieu</h1>
            <p className="skeleton-bg">
              Découvrez les activités disponibles dans ce lieu
            </p>
            <div className="banner skeleton-bg"></div>
          </>
        ) : (
          <>
            <MainTitle title={placeData?.name} />
            <p className="text-center">
              Découvrez les différentes activités disponibles au{" "}
              {placeData?.name} à {placeData?.cityName}.
            </p>
            <Image
              src={placeData?.bannerUrl || tokyo4k}
              alt="Place image"
              width={800}
              height={450}
              className="banner"
            />
          </>
        )}

        <CustomNav navigation={navigation} homeLink="/lieux" />
      </section>
      {children}
    </main>
  );
}
