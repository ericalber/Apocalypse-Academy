import React from 'react';
import Image from 'next/image';
import styles from '../styles/components/OptimizedImage.module.css';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  layout = 'responsive',
  objectFit = 'cover',
  priority = false,
  className = '',
  placeholder = 'blur',
  blurDataURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQviwAAAABJRU5ErkJggg=='
}) => {
  return (
    <div className={`${styles.imageContainer} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout={layout}
        objectFit={objectFit}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        loading={priority ? 'eager' : 'lazy'}
        quality={80}
      />
    </div>
  );
};

export default OptimizedImage;
