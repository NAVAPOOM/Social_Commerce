import React, { ImgHTMLAttributes } from "react";

const MagnitaLogo = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src="/magnita-logo.png" 
    alt="Magnita Logo"
    height="48"
    width="48"
    {...props} 
  />
);

export default MagnitaLogo;