import { getConfidenceValueOfAuraRatingObject } from 'constants/index';
import { useEffect, useMemo, useRef, useState } from 'react';

import { getConnection } from '../api/connections.service';
import { AuraRating } from '../types';

export const useSubjectRating = ({
  fromSubjectId,
  toSubjectId,
}: {
  fromSubjectId: string | undefined;
  toSubjectId: string;
}) => {
  const [rating, setRating] = useState<AuraRating | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!fromSubjectId) return;
    setLoading(true);
    getConnection(fromSubjectId, toSubjectId)
      .then((conn) => {
        if (mounted.current) {
          if (conn.previousRating) {
            setRating(conn.previousRating);
          }
          setLoading(false);
        }
      })
      .catch((e) => {
        if (e?.response?.data === 'No connection between these two brightId') {
          setLoading(false);
        } else {
          throw e;
        }
      });
  }, [fromSubjectId, toSubjectId]);

  const confidenceValue = useMemo(
    () => getConfidenceValueOfAuraRatingObject(rating),
    [rating],
  );

  return { rating, loading, confidenceValue };
};
