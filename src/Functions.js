export async function recordScreen() {
  return await navigator.mediaDevices.getDisplayMedia({
    audio: true,
    video: { mediaSource: "screen" },
  });
}

export function saveFile(recordedChunks) {
  const blob = new Blob(recordedChunks, {
    type: "video/webm",
  });
  let url = URL.createObjectURL(blob);
  URL.revokeObjectURL(blob); // clear from memory
  return url

}
export function createRecorder(stream, mimeType) {
  // the stream data is stored in this array
  let recordedChunks = [];

  const mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };
  mediaRecorder.onstop = function () {
    saveFile(recordedChunks);
    recordedChunks = [];
  };
  mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
  return mediaRecorder;
}
