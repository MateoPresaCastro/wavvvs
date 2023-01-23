export async function uploadProfilePic (file : File) : Promise<{url : string}> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'frameit');
  return fetch('https://api.cloudinary.com/v1_1/dkqmqt1gr/image/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
}

export async function uploadTrack (file : File) : Promise<{url : string}> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'frameit');
  console.log(2345);
  return fetch('https://api.cloudinary.com/v1_1/dkqmqt1gr/auto/upload', {
    method: 'POST',
    body: formData,
  }).then((res) => res.json());
}