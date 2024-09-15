'use client';

import React from 'react';
import Button from '@/app/components/Button';

const GlobalError: React.FC<{ error: Error & { digest?: string }; reset: () => void }> = ({ error, reset }) => {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center pt-10 mx-4">
          <h2 className="text-4xl md:text-6xl text-center mt-[30px]">Something went wrong!</h2>
          <p>{error?.message ?? ''}</p>
          <Button onClick={() => reset()}>Try again</Button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
