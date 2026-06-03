export function normalizeProduct(raw) {
  if (!raw) return null;

  return {
    id: raw.id,
    brand: raw.brand ?? "",
    model: raw.model ?? "",
    price: raw.price ? Number(raw.price) : null,
    imgUrl: raw.imgUrl ?? "",

    networkTechnology: raw.networkTechnology ?? "",
    networkSpeed: raw.networkSpeed ?? "",
    gprs: raw.gprs ?? "",
    edge: raw.edge ?? "",
    announced: raw.announced ?? "",
    status: raw.status ?? "",

    dimensions: raw.dimentions ?? "",
    weight: raw.weight ? `${raw.weight} g` : "",
    sim: raw.sim ?? "",

    displayType: raw.displayType ?? "",
    displayResolution: raw.displayResolution ?? "",
    displaySize: raw.displaySize ?? "",

    os: raw.os ?? "",
    cpu: raw.cpu ?? "",
    chipset: raw.chipset ?? "",
    gpu: raw.gpu ?? "",

    externalMemory: raw.externalMemory ?? "",
    internalMemory: toList(raw.internalMemory),
    ram: raw.ram ?? "",

    primaryCamera: toList(raw.primaryCamera),
    secondaryCamera: toList(raw.secondaryCmera),

    speaker: raw.speaker ?? "",
    audioJack: raw.audioJack ?? "",
    wlan: toList(raw.wlan),
    bluetooth: toList(raw.bluetooth),
    gps: raw.gps ?? "",
    nfc: raw.nfc ?? "",
    radio: raw.radio ?? "",
    usb: raw.usb ?? "",
    sensors: toList(raw.sensors),

    battery: raw.battery ?? "",
    colors: toList(raw.colors),

    options: {
      colors: raw.options?.colors ?? [],
      storages: raw.options?.storages ?? [],
    },
  };
}

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
}