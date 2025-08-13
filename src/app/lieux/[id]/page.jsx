import { redirect } from "next/navigation";

export default function LieuPage({ params }) {
  const { id } = params;

  redirect(`/lieux/${id}/evenements`);
}
