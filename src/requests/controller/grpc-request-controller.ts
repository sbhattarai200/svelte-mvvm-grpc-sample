import type { UnaryCall, RpcOptions, RpcMetadata } from '@protobuf-ts/runtime-rpc';
import { RpcError } from '@protobuf-ts/runtime-rpc';
import {metaDataHeader} from "../../configs/grpc-config";

const timeout = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const log = (message: string, ...args: any[]): void => {
    console.log(message, ...args);
};

const exponentialBackoff = (retries: number) => Math.pow(2, retries) * 500;

type Func<TReq extends object, TResp extends object> = (
    input: TReq,
    options?: RpcOptions
) => UnaryCall<TReq, TResp>;

export const grpc_call = async <ServiceClient, TReq extends object, TResp extends object>(
    client: ServiceClient,
    clientMethod: (service: ServiceClient) => Func<TReq, TResp>,
    args: TReq,
    retries?: number,
    metaHeader?: RpcMetadata
): Promise<TResp> => {
    const start = new Date();
    const tries = retries ?? 0;

    return new Promise(async (resolve, reject) => {
        const metadataResponse = await metaDataHeader(false);
        if (!metadataResponse) {
            reject(new Error('Failed to retrieve metadata headers'));
            return;
        }

        try {
            const method = clientMethod(client);
            const options: RpcOptions = {
                meta: {
                    ...metadataResponse,
                    ...(metaHeader || {})
                }
            };
            const call = method(args, options);
            const response = await call.response;

            const time = new Date().getTime() - start.getTime();
            log(
                'Call: ',
                method,
                '\n',
                'Request: ',
                args,
                '\n',
                'Response: ',
                response,
                '\n',
                'Time:',
                time
            );
            resolve(response);
        } catch (err) {
            console.log('RPC call error', err);
            const time = new Date().getTime() - start.getTime();
            if (!(err instanceof RpcError)) {
                reject(err);
                return;
            }

            if (tries === 0 ) {
                log(
                    'Call:',
                    clientMethod,
                    '\n',
                    'Request:',
                    args,
                    '\n',
                    'Error:',
                    { ...err, stack: 'REDACTED' },
                    '\n',
                    'Time:',
                    time
                );
                reject(err);
            } else {
                await timeout(exponentialBackoff(tries));
                // Recursive call with decreased tries, ensuring we return it
                resolve(await grpc_call(client, clientMethod, args, tries - 1, metaHeader));
            }
        }
    });
};
