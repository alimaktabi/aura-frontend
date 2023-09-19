import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { hash } from 'utils/crypto';

import { pullProfilePhoto } from '../api/login.service';
import {
  selectAuthData,
  selectBrightIdBackup,
} from '../store/profile/selectors';

const BrightIdProfilePicture = ({
  subjectId,
  ...props
}: React.HTMLAttributes<HTMLImageElement> & {
  subjectId: string | undefined;
}) => {
  const [imgSrc, setImgSrc] = useState('/assets/images/avatar-thumb.jpg');
  const authData = useSelector(selectAuthData);
  const brightIdBackup = useSelector(selectBrightIdBackup);
  useEffect(() => {
    let mounted = true;

    async function f() {
      if (!authData || !subjectId || !brightIdBackup) return;
      if (
        subjectId !== authData.brightId &&
        !brightIdBackup.connections.find((conn) => conn.id === subjectId)
      )
        return;
      try {
        const profilePhoto = await pullProfilePhoto(
          hash(authData.brightId + authData.password),
          subjectId,
          authData.password,
        );
        if (mounted) setImgSrc(profilePhoto);
      } catch (e) {
        console.log(e);
      }
    }

    f();
    return () => {
      mounted = false;
    };
  }, [authData, brightIdBackup, subjectId]);

  //TODO: use profile name in alt
  return <img {...props} alt={subjectId} src={imgSrc} />;
};

export default BrightIdProfilePicture;
