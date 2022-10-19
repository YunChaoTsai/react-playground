import { useState } from "react";
import "./App.css";

import { QRCode } from './components/qrcode';
import { QRCode as QRCodeReact } from './components/qrcode.react';
import { QRCode as GoogleChartQRCode } from './components/google-qrcode-api';

function App() {
  const [value, setValue] = useState<string>("https://www.google.com/");
  return (
    <div className="App">
      <div className="row">
        <input
          className="qr-input"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className="row">
        <div className="main">
          <div className="table-row">
            <div className="cell">
              <a
                href="https://www.npmjs.com/package/qrcode"
                target="_blank"
                rel="noopener noreferrer"
              >
                qrcode
              </a>
            </div>
            <div className="cell">
              <a
                href="https://www.npmjs.com/package/qrcode.react"
                target="_blank"
                rel="noopener noreferrer"
              >
                qrcode.react
              </a>
            </div>
            <div className="cell">
              <a
                href="https://developers.google.com/chart/infographics/docs/qr_codes"
                target="_blank"
                rel="noopener noreferrer"
              >
                google chart QRCode
              </a>
            </div>
          </div>
          <div className="table-row">
            <div className="cell">
              <QRCode fileName="test" value={value} />
            </div>
            <div className="cell">
              <QRCodeReact fileName="test" value={value} />
            </div>
            <div className="cell">
              <GoogleChartQRCode fileName="test" value={value} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
