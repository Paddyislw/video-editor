import React from "react";
import * as helpers from "../Utils/helpers";

export default function RangeInput({
  thumbNails,
  rEnd,
  rStart,
  handleUpdaterStart,
  handleUpdaterEnd,
  loading,
  control,
  videoMeta,
}) {
  let RANGE_MAX = 100;

  if(!videoMeta?.duration){
    return (
      <></>
    )
  }

  if (loading) {
    return (
      <center>
        <h2> processing thumbnails.....</h2>
      </center>
    );
  }

  return (
    <>
      <div className="range_pack">
        <div className="image_box">
          {thumbNails.map((imgURL, id) => (
            <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />
          ))}

          <div
            className="clip_box"
            style={{
              width: `calc(${2.72 - 1.29}% )`,
              left: `${1.29}%`,
            }}
            data-start={helpers.toTimeString(
              (1.28 / RANGE_MAX) * videoMeta.duration,
              false
            )}
            data-end={helpers.toTimeString(
              (2.72 / RANGE_MAX) * videoMeta.duration,
              false
            )}
          >
            <span className="clip_box_des"></span>
            <span className="clip_box_des"></span>
          </div>

          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterStart}
            value={1.29}
          />
          <input
            className="range"
            type="range"
            min={0}
            max={RANGE_MAX}
            onInput={handleUpdaterEnd}
            value={2.72}
          />
        </div>
      </div>

      {control}
    </>
  );
}
