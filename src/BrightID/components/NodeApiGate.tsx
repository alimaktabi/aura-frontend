import React, { useEffect, useState } from 'react';
import { ApiResponse } from 'apisauce';
import { selectBaseUrl } from 'BrightID/reducer/settingsSlice';
import { NodeApi } from 'BrightID/api/brightId';
import { pollOperations } from 'BrightID/utils/operations';
import { useDispatch, useSelector } from 'store/hooks';

type ApiContext = NodeApi | null;

export const NodeApiContext = React.createContext<ApiContext>(null);

export const ApiGateState = {
  INITIAL: 'INITIAL',
  SEARCH_REQUESTED: 'SEARCH_REQUESTED', // should start looking for node
  SEARCHING_NODE: 'SEARCHING', // currently looking for working node
  NODE_AVAILABLE: 'NODE_AVAILABLE', // All good, valid node is set
  ERROR_NO_NODE: 'ERROR_NO_NODE', // Failed to find a working node
} as const;
export type ApiGateState = (typeof ApiGateState)[keyof typeof ApiGateState];

// some thunks require access to the current NodeAPI, so also
// make it available as a global var.
let globalNodeApi: ApiContext = null;
export const getGlobalNodeApi = () => globalNodeApi;

const NodeApiGate = (props: React.PropsWithChildren<unknown>) => {
  const id = useSelector<string>((state: RootState) => state.user.id);
  const secretKey = useSelector<Uint8Array>(
    (state: RootState) => state.keypair.secretKey,
  );
  const url = useSelector<string>(selectBaseUrl);
  const [nodeError, setNodeError] = useState(false);
  const [api, setApi] = useState<NodeApi | null>(null);
  const [gateState, setGateState] = useState<ApiGateState>(
    ApiGateState.INITIAL,
  );

  const dispatch = useDispatch();

  // show node error modal
  useEffect(() => {
    if (nodeError) {
      alert('Could not connect to BrightID Aura node');
    }
  }, [dispatch, nodeError]);

  // Manage NodeAPI instance
  useEffect(() => {
    let responseCounter = 0;
    const apiMonitor = (response: ApiResponse<NodeApiRes, ErrRes>) => {
      responseCounter++;
      if (!response.ok) {
        switch (response.problem) {
          case 'SERVER_ERROR':
          case 'CONNECTION_ERROR':
          case 'NETWORK_ERROR':
          case 'TIMEOUT_ERROR':
            console.log(
              `Node monitor: Detected problem: ${response.status} - ${response.problem}.`,
            );
            setNodeError(true);
            break;
          default:
            console.log(`Node monitor: Ignoring problem ${response.problem}`);
        }
      }
      /*
      if (responseCounter % 5 === 0) {
        console.log(`Pretending server error`);
        setNodeError(true);
      }
       */
    };

    if (url) {
      let apiInstance: NodeApi;
      if (id && id.length > 0 && secretKey && secretKey.length > 0) {
        console.log(`Creating API with credentials using ${url}`);
        apiInstance = new NodeApi({ url, id, secretKey, monitor: apiMonitor });
      } else {
        console.log(`Creating anonymous API using ${url}`);
        apiInstance = new NodeApi({
          url,
          id: undefined,
          secretKey: undefined,
          monitor: apiMonitor,
        });
      }
      setGateState(ApiGateState.NODE_AVAILABLE);
      globalNodeApi = apiInstance;
      setApi(apiInstance);
    } else {
      globalNodeApi = null;
      setApi(null);
    }
  }, [url, id, secretKey]);

  // Manage polling for operations
  useEffect(() => {
    if (api) {
      // subscribe to operations
      const timerId = setInterval(() => {
        dispatch(pollOperations(api));
      }, 5000);
      console.log(`Started pollOperationsTimer ${timerId}`);

      return () => {
        console.log(`Stop pollOperationsTimer ${timerId}`);
        clearInterval(timerId);
      };
    }
  }, [api, dispatch]);

  if (url && api && gateState === ApiGateState.NODE_AVAILABLE) {
    return (
      <NodeApiContext.Provider value={api}>
        {props.children}
      </NodeApiContext.Provider>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default NodeApiGate;
