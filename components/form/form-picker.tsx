'use client';

import { useState, useEffect } from 'react';
import { unsplash } from '@/lib/unsplash';
import { Check, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { defaultImages } from '@/constants/images';
import Link from 'next/link';
import FormErrors from './form-errors';

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormPicker({ id, errors }: FormPickerProps) {
  const [selectedImgId, setSelectedImgId] = useState<string | null>(null);
  const [images, setImages] = useState<Array<Record<string, any>>>([]);
  // const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const { pending } = useFormStatus();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const imgs = result.response as Array<Record<string, any>>;
          setImages(imgs);
        } else {
          console.log('Failed to get images from unsplash');
        }
      } catch (error) {
        console.log(error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    // fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-sky-700 animate-spin " />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {/* {images.map((img) => ( */}
        {defaultImages.map((img) => (
          <div
            key={img.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImgId(img.id);
            }}
          >
            <input
              id={id}
              name={id}
              className="hidden"
              type="radio"
              checked={selectedImgId === img.id}
              disabled={pending}
              value={`${img.id}|${img.urls.thumb}|${img.urls.full}|${img.links.html}|${img.user.name}`}
            />
            <Image
              fill
              src={img.urls.thumb}
              alt="Unsplash Image"
              className="object-cover rouded-sm"
            />
            {selectedImgId === img.id && (
              <div className="absolute inset-y-0 h-full w-full bg-black/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
            <Link
              href={img.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50"
            >
              {img.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors errors={errors} id={id} />
    </div>
  );
}
