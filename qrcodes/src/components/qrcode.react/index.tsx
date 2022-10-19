import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

import type { FC } from "react";

interface QRCodeProps {
  value: string;
  fileName: string;
}

export const QRCode: FC<QRCodeProps> = ({ value, fileName }) => {
  const ref = useRef<HTMLDivElement>(null);

  const download = () => {
    if (ref.current === null) return;
    const canvas = ref.current.querySelector("canvas");
    if (canvas === null) return;

    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `${fileName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div ref={ref}>
      <div className="row">
        <QRCodeCanvas
          value={value}
          bgColor="#ffffff"
          fgColor="#000000"
          level={"H"}
          includeMargin={false}
        />
      </div>
      <button onClick={download}>download</button>
    </div>
  );
};
