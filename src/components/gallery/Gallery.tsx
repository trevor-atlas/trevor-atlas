import { useState } from 'react';
import Image from 'next/image';
import styles from './gallery.module.scss';

interface GalleryProps {
  images: string[];
}

export function Gallery(props: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className={styles.gallery}>
      <img
        className={styles.gallery__img}
        src={props.images[selectedImage]}
        alt=""
      />
      <div className="flex flex-row gap-0 bg-slate-700">
        {props.images.map((image, index) => (
          <div className={styles.gallery__item}>
            <div onClick={() => setSelectedImage(index)}>
              <Image
                className={`${styles.gallery__thumb} ${
                  selectedImage === index ? styles.gallery__thumb__selected : ''
                }`}
                src={image}
                alt=""
                width={200}
                height={200}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
