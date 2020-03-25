import React from "react";

const EmbedVideo = ({ width, host, source, title }) => {
  var url = null;
  switch (host) {
    case "youtube":
      url =
        "https://www.youtube.com/embed/" +
        source +
        "?autoplay=1&loop=1&controls=0&modestbranding=1";
      break;
    case "vimeo":
      url =
        "https://player.vimeo.com/video/" +
        source +
        "?autoplay=1&loop=1&title=0&byline=0&portrait=0";
      break;
    default:
      break;
  }
  return (
    <div className={`embed-media media-video width-${width}`}>
      <div>
        <iframe
          src={url}
          title={title}
          name={title}
          allow="autoplay; encrypted-media"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default EmbedVideo;
