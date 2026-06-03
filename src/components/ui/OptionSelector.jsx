import { getColorHex } from "@/lib/colorMap";

export default function OptionSelector({ label, options, selected, onSelect, renderOption }) {
  return (
    <div>
      <p className="mb-2 text-sm text-neutral-500">{label}</p>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected === option.code;
          return (
            <button
              key={option.code}
              type="button"
              onClick={() => onSelect(option.code)}
            >
              {renderOption(option, isSelected)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function StorageOption({ option, isSelected }) {
  return (
    <span
      className={`inline-block rounded-md border px-3 py-2 text-sm transition ${
        isSelected
          ? "border-orange-500 bg-orange-500 text-white"
          : "border-neutral-200 bg-white text-neutral-700 hover:border-orange-300"
      }`}
    >
      {option.name}
    </span>
  );
}

export function ColorOption({ option, isSelected }) {
  return (
    <span
      className={`inline-flex flex-col items-center gap-1.5 rounded-md border px-3 py-2 text-xs transition ${
        isSelected
          ? "ring-2 ring-orange-500 border-orange-300 bg-white text-neutral-900"
          : "border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400"
      }`}
    >
      <span
        className="h-5 w-5 rounded-full border border-neutral-200"
        style={{ backgroundColor: getColorHex(option.name) }}
      />
      <span>{option.name}</span>
    </span>
  );
}
