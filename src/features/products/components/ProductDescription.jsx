import Collapsible from "@/components/ui/Collapsible";

export default function ProductDescription({ product }) {
  const specs = [
    ["Marca", product.brand],
    ["Modelo", product.model],
    ["Precio", product.price != null ? `${product.price} €` : "—"],
    ["CPU", product.cpu],
    ["RAM", product.ram],
    ["Sistema Operativo", product.os],
    ["Resolución de pantalla", product.displayResolution],
    ["Batería", product.battery],
    ["Cámara principal", product.primaryCamera.join(", ")],
    ["Cámara secundaria", product.secondaryCamera.join(", ")],
    ["Dimensiones", product.dimensions],
    ["Peso", product.weight],
  ];

  return (
    <Collapsible title="Especificaciones técnicas">
      <table className="w-full text-sm">
        <tbody className="divide-y divide-orange-200">
          {specs.map(([label, value]) => (
            <tr key={label}>
              <td className="w-2/5 px-4 py-2.5 font-medium text-neutral-500">
                {label}
              </td>
              <td className="bg-neutral-50 px-4 py-2.5 text-right text-neutral-900">
                {value || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Collapsible>
  );
}
