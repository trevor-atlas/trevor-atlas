import Link from 'next/link';
import React, { CSSProperties, ReactNode } from 'react';

interface CardProps {
  style?: CSSProperties;
  imageUrl: string;
  imageAlt?: string;
  label: ReactNode;
  title: ReactNode;
  description: ReactNode;
  url: string;
}

export const Card = ({
  style,
  imageUrl,
  imageAlt = '',
  label,
  title,
  description,
  url
}: CardProps) => (
  <Link href={url} style={style} className="group relative block bg-black">
    <img
      alt="Developer"
      src={imageUrl}
      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
    />
    <div className="relative p-8">
      <p className="text-sm font-medium uppercase tracking-widest text-orange-500">
        {label}
      </p>
      <p className="text-2xl font-bold text-white">{title}</p>
      <div className="mt-64">
        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-sm text-white">{description}</p>
        </div>
      </div>
    </div>
  </Link>
);
