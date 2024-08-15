'server-only'

import { clientConfig, serverConfig } from "@/config";
import { getTokens as gT } from "next-firebase-auth-edge";
import { cookies } from "next/headers";


export default async function getTokens(): Promise<string | undefined> {
  const tokens = await gT(cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });

  return tokens?.token
}