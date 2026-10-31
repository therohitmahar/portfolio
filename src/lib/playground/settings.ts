export const easings = {
  gentle: { label: "Gentle", value: "cubic-bezier(.45,0,.55,1)" },
  smooth: { label: "Ease out", value: "cubic-bezier(.215,.61,.355,1)" },
  brisk: { label: "Snappy", value: "cubic-bezier(.22,1,.36,1)" },
  linear: { label: "Linear", value: "cubic-bezier(0,0,1,1)" },
};
export const defaults = {
  first: "rohit", second: "mahar", duration: 1000, stagger: 100,
  easing: "gentle" as keyof typeof easings,
  firstColor: "#687137", secondColor: "#262923", background: "#f1f1e8", size: 100,
};
export type Settings = typeof defaults;
export function readSettings(value: unknown): Settings {
  const data = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const word = (key: "first" | "second") => typeof data[key] === "string" && /^[a-z]{1,24}$/.test(data[key]) ? data[key] : defaults[key];
  const color = (key: "firstColor" | "secondColor" | "background") => typeof data[key] === "string" && /^#[\da-f]{6}$/i.test(data[key]) ? data[key] : defaults[key];
  const number = (key: "duration" | "stagger" | "size", min: number, max: number) => typeof data[key] === "number" && Number.isFinite(data[key]) ? Math.max(min, Math.min(max, data[key])) : defaults[key];
  return {first:word("first"),second:word("second"),duration:number("duration",300,3000),stagger:number("stagger",0,200),size:number("size",40,100),easing:typeof data.easing === "string" && Object.hasOwn(easings,data.easing) ? data.easing as Settings["easing"] : defaults.easing, firstColor:color("firstColor"),secondColor:color("secondColor"),background:color("background")};
}

export function previewInk(background:string) {
  const rgb = [1,3,5].map(offset => parseInt(background.slice(offset,offset+2),16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  const luminance=.2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
  return luminance>.179?"#000000":"#ffffff";
}
