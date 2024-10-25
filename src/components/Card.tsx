import Image from "next/image";
import CollectionTag from "@/components/CollectionTag";

const collection = ["新手", "一池", "二池", "三池", "四池", "五池"]
type Pool = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7'

export type Collection = typeof collection[number]

export const Pool2Collection = (pool: Pool): Collection => {
  if (['0', '1', '2'].includes(pool)) {
    return collection[0];
  }
  return collection[Number(pool) - 1]
}

export type CardProps = {
  name: string;
  src: string;
  collection: Collection;
  tier?: number;
  status?: 'obtained' | 'variantOnly' | 'notObtained';
}

export default function Card({ name, src, collection, tier, status = 'notObtained' }: CardProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'obtained':
        return 'bg-green-500';
      case 'variantOnly':
        return 'bg-yellow-500';
      default:
        return 'bg-white';
    }
  };

  const getTierStars = (tier?: number) => {
    if (!tier) return '';
    return '⭐'.repeat(tier);
  };

  return (
    <div className={`w-64 rounded-lg overflow-hidden shadow-lg ${getStatusColor()}`}>
      <div className="h-64 relative">
        <div className="w-full h-full relative blur">
          <Image 
            src={src} 
            alt={name} 
            layout="fill" 
            objectFit="contain"
          />
        </div>
      </div>
      <div className="py-1">
        <div className="border-b border-gray-300"></div>
      </div>
      <div className="p-2 flex justify-between items-center">
        <div className="text-sm">
          <CollectionTag collection={collection} />
        </div>
        <div className="text-sm text-right">
          {getTierStars(tier)}
        </div>
      </div>
    </div>
  );
}
