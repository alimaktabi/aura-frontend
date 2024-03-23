import { useEffect, useMemo, useState } from 'react';

import {
  getInboundConnections,
  getOutboundConnections,
} from '../api/connections.service';
import { AuraNodeBrightIdConnection } from '../types';

export const useInboundConnections = (subjectId: string | null | undefined) => {
  const [inboundConnections, setInboundConnections] = useState<
    AuraNodeBrightIdConnection[] | null
  >(null);
  useEffect(() => {
    let mounted = true;
    setInboundConnections(null);
    if (subjectId) {
      getInboundConnections(subjectId).then((connections) => {
        if (mounted) {
          setInboundConnections(connections);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [subjectId]);

  return {
    loading: useMemo(() => inboundConnections === null, [inboundConnections]),
    connections: inboundConnections,
  };
};

export const useOutboundConnections = (
  subjectId: string | null | undefined,
) => {
  const [outboundConnections, setOutboundConnections] = useState<
    AuraNodeBrightIdConnection[] | null
  >(null);
  useEffect(() => {
    let mounted = true;
    setOutboundConnections(null);
    if (subjectId) {
      getOutboundConnections(subjectId).then((connections) => {
        if (mounted) {
          setOutboundConnections(connections);
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [subjectId]);
  return { connections: outboundConnections };
};

export const useSubjectConnections = (subjectId: string | null | undefined) => {
  const inboundConnectionsData = useInboundConnections(subjectId);
  const outboundConnectionsData = useOutboundConnections(subjectId);
  return { ...inboundConnectionsData, ...outboundConnectionsData };
};
