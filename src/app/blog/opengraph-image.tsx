import { ImageResponse } from "next/og";

export const alt = "Saood Qureshi portfolio blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#09090b",
        color: "#fafafa",
        fontSize: 64,
        fontWeight: 700,
      }}
    >
      Saood Qureshi
    </div>,
    size
  );
}