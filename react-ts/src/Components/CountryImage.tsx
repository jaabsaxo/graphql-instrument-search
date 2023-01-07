import React from 'react';


interface AsyncImageProps {
  src: string;
}

const CountryImage: React.FC<AsyncImageProps> = ({src}: AsyncImageProps) => {
  const [loadedSrc, setLoadedSrc] = React.useState(String);
  React.useEffect(() => {
      setLoadedSrc("null");
      if (src) {
          const handleLoad = () => {
              setLoadedSrc(src);
          };
          const image = new Image();
          image.addEventListener('load', handleLoad);
          image.src = src;
          return () => {
              image.removeEventListener('load', handleLoad);
          };
      }
  }, [src]);
  if (loadedSrc === src) {
      return (
          <img 
            src={src} 
            width="10"
            height="10"
          />
      );
  }
  return null;
};


export default CountryImage;