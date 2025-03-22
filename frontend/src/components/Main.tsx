export default function Main() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>H365 QRanked</h1>

      <div style={{ fontFamily: 'monospace' }}>
        <style>
          {`
          table {
            padding: 1rem;
            border: 1px solid black;
          }
          table td, table th {
            padding: 10px;
          }
        `}
        </style>
        <table style={{}}>
          <tbody>
            <tr>
              <td>Manual QR Code Generator:</td>
              <td><a href="#/generate-manual">/generate-manual</a></td>
            </tr>
            <tr>
              <td>Auto QR Code Generator:</td>
              <td><a href="#/generate-auto">/generate-auto</a></td>
            </tr>
            <tr>
              <td>QR Code Scanner:</td>
              <td><a href="#/scanner">/scanner</a></td>
            </tr>
            <tr>
              <td>Alpha App (Under Development):</td>
              <td><a href="#/alpha">/alpha</a></td>
            </tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );

}