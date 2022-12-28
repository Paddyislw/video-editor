import React, { useState } from "react";
import { Trim } from "./trim";

const ScreenRecorder = () => {
  const [url, setUrl] = useState(null);
  const [videoBlob,setVideoBlob] = useState(null)
  async function recordScreen() {
    return await navigator.mediaDevices.getDisplayMedia({
      audio: true,
      video: { mediaSource: "screen" },
    });
  }

  function saveFile(recordedChunks) {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    setVideoBlob(blob)
    let url = URL.createObjectURL(blob);
    URL.revokeObjectURL(blob); // clear from memory
    setUrl(url);
  }
  function download() {
    const link = document.createElement("a");
    link.href = url;
    link.download = "video.webm";
    link.click();
  }
  function createRecorder(stream, mimeType) {
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
      stream
        .getTracks() // get all tracks from the MediaStream
        .forEach((track) => track.stop()); // stop each of them
    };
    mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
    return mediaRecorder;
  }

  let mediaRecorder;
  const startRecording = async () => {
    let stream = await recordScreen();
    console.log("bug", stream);
    let mimeType = "video/webm";
    mediaRecorder = createRecorder(stream, mimeType);
  };
  
  const stopRecording = async () => {
    mediaRecorder.stop();
  };
  //console.log(videoBlob)
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "5px",
          margin: "50px",
        }}
      >
        <button onClick={startRecording}>Start</button>
        <button onClick={stopRecording}>Stop</button>
        {url && <button onClick={download}>Download</button>}
      </div>
      {url && (
        <video
          src={url}
          controls
          style={{
            marginRight: "auto",
            width: "1000px",
            marginLeft: "auto",
            display: "flex",
          }}
        />
      )}
   
    </div>
  );
};

export default ScreenRecorder;
