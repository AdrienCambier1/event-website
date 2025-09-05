import CustomTitle from "@/components/titles/custom-title";
import ReviewCard from "@/components/cards/review-card";
import { SendDiagonal } from "iconoir-react";

export default function ReviewList({ title, description, showText, showForm }) {
  return (
    <section className="page-grid">
      <div className="z-10">
        <div className="flex flex-col gap-6 sticky top-20">
          <CustomTitle title={title} description={description} />
          <div className="flex flex-col gap-4">
            {showText && (
              <p>
                Consultez les différents avis laissés par les participants de
                vos événements.
              </p>
            )}
            {showForm && (
              <>
                <input type="text" placeholder="Votre avis" />
                <button className="primary-btn">
                  <span>Publier votre avis</span> <SendDiagonal />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="cards-grid !grid-cols-1 ">
        <ReviewCard
          name="Jean claude"
          note={4}
          date="vendredi 13 juin 2024"
          review="J’ai bien aimé c’était cool, surtout quand il a commencé à faire de la gymnastique."
        />
        <ReviewCard
          name="Jean claude"
          note={4}
          date="vendredi 13 juin 2024"
          review="J’ai bien aimé c’était cool, surtout quand il a commencé à faire de la gymnastique."
        />
        <ReviewCard
          name="Jean claude"
          note={4}
          date="vendredi 13 juin 2024"
          review="J’ai bien aimé c’était cool, surtout quand il a commencé à faire de la gymnastique."
        />
        <ReviewCard
          name="Jean claude"
          note={4}
          date="vendredi 13 juin 2024"
          review="J’ai bien aimé c’était cool, surtout quand il a commencé à faire de la gymnastique."
        />
      </div>
    </section>
  );
}
