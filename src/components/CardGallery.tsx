import Card, { CardProps } from "@/components/Card";

type CardGalleryProps = {
  cards: CardProps[];
};

export default function CardGallery({ cards }: CardGalleryProps) {
  return (
    <div
      className={`
      container mx-auto px-4
      grid gap-4
      grid-cols-3
      sm:grid-cols-4
      md:grid-cols-6
      lg:grid-cols-8
      xl:grid-cols-10
      2xl:grid-cols-12
    `}
    >
      {cards.map((card, index) => (
        <div key={index} className="flex justify-center">
          <Card {...card} />
        </div>
      ))}
    </div>
  );
}
