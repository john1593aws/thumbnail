export const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

export function debugBase64(base64URL) {
  const fileWindow = window.open();
  fileWindow.document.write(
    '<title>Visualisation</title>' +
      '<body style="overflow: hidden; margin: 0">' +
      '<object width="100%" width="-webkit-fill-available" height="100%" height="-webkit-fill-available" type="application/pdf" data="' +
      encodeURI(base64URL) +
      '"></object>' +
      '</body>'
  );
}
