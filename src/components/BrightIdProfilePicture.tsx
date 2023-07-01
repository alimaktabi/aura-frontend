import React, { useEffect, useState } from 'react';
import { selectAuthData } from '../store/profile/selectors.ts';
import { useSelector } from 'react-redux';
import { pullProfilePhoto } from '../api/login.service.ts';

const BrightIdProfilePicture = (
  props: React.HTMLAttributes<HTMLImageElement> & { id: string },
) => {
  const [imgSrc, setImgSrc] = useState('/assets/images/avatar-thumb.jpg');
  const authData = useSelector(selectAuthData);
  useEffect(() => {
    let mounted = true;

    async function f() {
      if (!authData) return;
      const profilePhoto = await pullProfilePhoto(
        authData.authKey,
        props.id,
        authData.password,
      );
      if (mounted) setImgSrc(profilePhoto);
    }

    f();
    return () => {
      mounted = false;
    };
  }, [authData, props.id]);

  return <img {...props} src={imgSrc} />;
};

export default BrightIdProfilePicture;
