import { useMemo } from "react";

import type { FC } from "react";

interface QRCodeProps {
  value: string;
  fileName: string;
}

const API_ROOT = "https://chart.googleapis.com/chart";

interface Options {
  height: number;
  width: number;
  value: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  encoding?: "UTF-8" | "Shift_JIS" | "ISO-8859-1";
  /** This is in rows, not in pixels. */
  margin?: number;
}

const buildOptions = ({
  width,
  height,
  value,
  errorCorrectionLevel = "L",
  encoding = "UTF-8",
  margin,
}: Options): string => {
  const params = new URLSearchParams({
    cht: "qr",
    chs: `${width}x${height}`,
    chl: value,
  });
  if (margin !== undefined) {
    params.set("chld", `${errorCorrectionLevel}|${margin}`);
  }
  if (encoding !== "UTF-8") {
    params.set("choe", encoding);
  }
  return params.toString();
};

async function download(path: string, fileName: string) {
  const image = await fetch(path);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement("a");
  link.href = imageURL;
  link.download = `${fileName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const QRCode: FC<QRCodeProps> = ({ value, fileName }) => {
  const path = useMemo(() => {
    if (!value) return "";
    return `${API_ROOT}?${buildOptions({
      width: 128,
      height: 128,
      value,
      errorCorrectionLevel: "H",
      margin: 0,
    })}`;
  }, [value]);

  return (
    <div>
      <div>
        <img src={path} alt="qrcode" />
      </div>
      <button onClick={() => download(path, fileName)}>download</button>
    </div>
  );
};
