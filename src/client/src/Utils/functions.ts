export async function uploadProfilePic(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'frameit');
  return fetch('https://api.cloudinary.com/v1_1/dkqmqt1gr/image/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
}

export async function uploadTrack(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'frameit');
  console.log(2345);
  return fetch('https://api.cloudinary.com/v1_1/dkqmqt1gr/auto/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
}

export function compressImage(dataUrl: string) {
  const image = new Image();
  image.src = dataUrl;
  image.onload = function () {
    const canvas = document.createElement('canvas');
    canvas.width = image.width / 3;
    canvas.height = image.height / 3;
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(image, 0, 0, canvas.width, canvas.height);
    const compressedImage = canvas.toDataURL();
    sessionStorage.setItem('compressedImage', compressedImage);
  };
}

export async function compressAndStoreFromUrl(url: string) {
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        compressImage(reader.result!.toString());
      };
    });
}

export function parseJWT(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}
