import { describe, it, expect } from "vitest";
import { normalizeProduct } from "./normalizeProduct";

const raw = {
  id: "1",
  brand: "Samsung",
  model: "Galaxy S24",
  price: "899",
  imgUrl: "https://example.com/img.jpg",
  networkTechnology: "GSM",
  networkSpeed: "HSPA",
  gprs: "Yes",
  edge: "Yes",
  announced: "2024",
  status: "Available",
  dimentions: "147.0 x 70.6 x 7.6 mm",
  weight: "167",
  sim: "Nano-SIM",
  displayType: "Dynamic AMOLED",
  displayResolution: "1080 x 2340",
  displaySize: "6.2 inches",
  os: "Android 14",
  cpu: "Octa-core",
  chipset: "Exynos 2400",
  gpu: "Xclipse 940",
  externalMemory: "No",
  internalMemory: "128GB, 256GB",
  ram: "8 GB",
  primaryCamera: "50 MP",
  secondaryCmera: "12 MP",
  speaker: "Stereo",
  audioJack: "No",
  wlan: "Wi-Fi 802.11",
  bluetooth: "5.3",
  gps: "Yes",
  nfc: "Yes",
  radio: "No",
  usb: "Type-C",
  sensors: "Accelerometer, Gyro",
  battery: "4000 mAh",
  colors: "Black, White, Violet",
  options: {
    colors: [
      { code: "black", name: "Black" },
      { code: "white", name: "White" },
    ],
    storages: [
      { code: "128", name: "128 GB" },
      { code: "256", name: "256 GB" },
    ],
  },
};

describe("normalizeProduct", () => {
  it("maps all basic fields correctly", () => {
    const result = normalizeProduct(raw);
    expect(result.id).toBe("1");
    expect(result.brand).toBe("Samsung");
    expect(result.model).toBe("Galaxy S24");
    expect(result.imgUrl).toBe("https://example.com/img.jpg");
  });

  it("converts price from string to number", () => {
    const result = normalizeProduct(raw);
    expect(result.price).toBe(899);
  });

  it("handles null price", () => {
    const result = normalizeProduct({ ...raw, price: null });
    expect(result.price).toBeNull();
  });

  it("fixes dimentions typo to dimensions", () => {
    const result = normalizeProduct(raw);
    expect(result.dimensions).toBe("147.0 x 70.6 x 7.6 mm");
  });

  it("fixes secondaryCmera typo to secondaryCamera", () => {
    const result = normalizeProduct(raw);
    expect(result.secondaryCamera).toEqual(["12 MP"]);
  });

  it("appends 'g' suffix to weight", () => {
    const result = normalizeProduct(raw);
    expect(result.weight).toBe("167 g");
  });

  it("converts string fields to arrays via toList", () => {
    const result = normalizeProduct(raw);
    expect(result.primaryCamera).toEqual(["50 MP"]);
    expect(result.wlan).toEqual(["Wi-Fi 802.11"]);
    expect(result.bluetooth).toEqual(["5.3"]);
    expect(result.sensors).toEqual(["Accelerometer, Gyro"]);
    expect(result.colors).toEqual(["Black, White, Violet"]);
  });

  it("returns null for null or undefined input", () => {
    expect(normalizeProduct(null)).toBeNull();
    expect(normalizeProduct(undefined)).toBeNull();
  });
});
