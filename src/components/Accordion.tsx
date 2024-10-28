import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useShallow } from "zustand/shallow";
import { useCardState } from "@/hooks/cards";
import { CardProps } from "@/components/Card";

type AccordionProps = {
  title: string;
  children: React.ReactNode;
  cards: CardProps[];
  defaultOpen?: boolean;
};

export default function Accordion({
  title,
  children,
  cards,
  defaultOpen = false,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const { setObtained } = useCardState(
    useShallow((state) => ({
      setObtained: state.setObtained,
    }))
  );

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">{title}</span>
          <button
            className="inline-block px-3 py-1 rounded-full text-black text-xs font-light shadow-md"
            onClick={() => {
              setObtained(cards.map((card) => card.name));
            }}
          >
            添加全部
          </button>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <div
        className={`transition-all duration-200 ease-in-out ${
          isOpen ? "opacity-100" : "h-0 opacity-0"
        } overflow-y-auto`}
      >
        <div className="p-4 bg-white">{children}</div>
      </div>
    </div>
  );
}
