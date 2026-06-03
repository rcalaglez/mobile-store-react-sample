import { useState } from "react";
import OptionSelector, {
  StorageOption,
  ColorOption,
} from "@/components/ui/OptionSelector";

export default function ProductActions({ product }) {
  const storages = product.options.storages ?? [];
  const colors = product.options.colors ?? [];

  const [storageCode, setStorageCode] = useState(storages[0]?.code ?? null);
  const [colorCode, setColorCode] = useState(colors[0]?.code ?? null);

  const canAdd = storageCode != null && colorCode != null;

  function handleAdd() {
    if (!canAdd) return;
  }

  return (
    <section className="mt-8 space-y-6">
      <OptionSelector
        label="Almacenamiento"
        options={storages}
        selected={storageCode}
        onSelect={setStorageCode}
        renderOption={(option, isSelected) => (
          <StorageOption option={option} isSelected={isSelected} />
        )}
      />

      <OptionSelector
        label="Color"
        options={colors}
        selected={colorCode}
        onSelect={setColorCode}
        renderOption={(option, isSelected) => (
          <ColorOption option={option} isSelected={isSelected} />
        )}
      />

      <button
        type="button"
        onClick={handleAdd}
        disabled={!canAdd}
        className="w-full rounded-md bg-orange-500 py-3 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {"Añadir al carrito"}
      </button>
    </section>
  );
}
