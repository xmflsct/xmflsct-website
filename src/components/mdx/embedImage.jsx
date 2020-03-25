import React from "react";

const EmbedImage = ({ width, children }) => (
  <div className={`embed-media media-image width-${width}`}>
    {children}
  </div>
);

export default EmbedImage;
