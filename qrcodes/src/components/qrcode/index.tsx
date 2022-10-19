import { toDataURL } from "qrcode";

import { FC, useEffect, useState } from "react";
import type { QRCodeSegment, QRCodeToDataURLOptions } from "qrcode";

export async function toQrCodeDataUrl(
  text: string | QRCodeSegment[],
  options?: QRCodeToDataURLOptions & {
    /**
     * Workaround for the missing type
     * https://github.com/soldair/node-qrcode#maskpattern
     */
    maskPattern?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  }
): Promise<string> {
  const buffer = await toDataURL(text, options);
  return buffer;
}

interface QRCodeProps {
  value: string;
  fileName: string;
}

const logError = console.error;

export const QRCode: FC<QRCodeProps> = ({ value, fileName }) => {
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    let isCanceled = false;
    if (!value) return;
    (async () => {
      const dataUrl = await (async () => {
        try {
          // Use the same config with backend first.
          return await toQrCodeDataUrl(value, {
            version: 3,
            errorCorrectionLevel: "H",
            maskPattern: 6,
          });
        } catch (err) {
          logError(err);
          if (isCanceled) return;
          try {
            // fallback if throw error
            return await toQrCodeDataUrl(value, { errorCorrectionLevel: "H" });
          } catch (errInner) {
            logError(errInner);
          }
        }
      })();
      if (isCanceled) return;
      if (!dataUrl) return;
      setQrCode(dataUrl);
    })();
    return () => {
      isCanceled = true;
    };
  });

  const downloadQrCode = () => {
    const anchor = document.createElement('a');

    anchor.href = qrCode;
    anchor.download = `${fileName}.png`;
    anchor.click();
    anchor.remove();
  };

  return (
    <div>
      <div>
        {qrCode ? <img src={qrCode} alt="qrcode" /> : null}
      </div>
      <button onClick={downloadQrCode}>
        download
      </button>
    </div>
  );
};
