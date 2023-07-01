import { useEffect, useState } from 'react';

const BrightIdProfilePicture = (props: any) => {
  const [imgSrc, setImgSrc] = useState('/assets/images/avatar-thumb.jpg');

  useEffect(() => {
    let mounted = true;

    async function f() {
      if (mounted) setImgSrc('/assets/images/avatar-thumb.jpg');
    }

    f();
    return () => {
      mounted = false;
    };
  }, []);

  return <img {...props} src={imgSrc} />;
};

export default BrightIdProfilePicture;
