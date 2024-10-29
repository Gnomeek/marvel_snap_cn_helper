import { Collection } from "@/utils/types";

export type CollectionTagProps = {
  collection: Collection;
};

export default function CollectionTag({ collection }: CollectionTagProps) {
  return (
    <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold shadow-md">
      {collection}
    </div>
  );
}
