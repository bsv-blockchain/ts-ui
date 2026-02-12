import { IdentityClient, KNOWN_IDENTITY_TYPES as knownCertificateTypes, IdentityClientOptions, OriginatorDomainNameStringUnder250Bytes, WalletInterface } from "@bsv/sdk"
import { Certifier } from "../types"

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const isIdentityKey = (key: string) => {
  const regex = /^(02|03|04)[0-9a-fA-F]{64}$/
  return regex.test(key)
}

// Cache the IdentityClient so ContactsManager's in-memory cache persists across searches
let cachedClient: IdentityClient | null = null
let cachedWallet: WalletInterface | undefined
let cachedOptionsJson: string | undefined
let cachedOriginator: OriginatorDomainNameStringUnder250Bytes | undefined

function getClient(wallet?: WalletInterface, options?: IdentityClientOptions, originator?: OriginatorDomainNameStringUnder250Bytes): IdentityClient {
  // wallet is compared by reference — callers should pass a stable instance
  // options is compared by value (JSON) since callers may create new object literals
  const optionsJson = options != null ? JSON.stringify(options) : undefined
  if (cachedClient && cachedWallet === wallet && cachedOptionsJson === optionsJson && cachedOriginator === originator) {
    return cachedClient
  }
  cachedClient = new IdentityClient(wallet, options, originator)
  cachedWallet = wallet
  cachedOptionsJson = optionsJson
  cachedOriginator = originator
  return cachedClient
}

export const fetchIdentities = async (
  query: string,
  wallet?: WalletInterface | undefined,
  options?: IdentityClientOptions | undefined,
  originator?: OriginatorDomainNameStringUnder250Bytes | undefined,
  signal?: AbortSignal
) => {
  // Bail immediately if already aborted
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')

  const client = getClient(wallet, options, originator)

  // Race the actual fetch against the abort signal so callers can cancel
  // in-flight requests when a newer query supersedes this one.
  const fetchPromise = isIdentityKey(query)
    ? client.resolveByIdentityKey({ identityKey: query }, true)
    : client.resolveByAttributes({ attributes: { any: query } }, true)

  if (!signal) return await fetchPromise

  return await Promise.race([
    fetchPromise,
    new Promise<never>((_, reject) => {
      signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError')), { once: true })
    })
  ])
}

// Returns the correct tool tip depending on the certifier and certificate type
export const getCertifierToolTip = (certifier: Certifier, certificateType: string) => {
  switch (certificateType) {
    case knownCertificateTypes.discordCert:
      return `Discord account certified by ${certifier.name}`
    case knownCertificateTypes.xCert:
      return `X (Twitter) account certified by ${certifier.name}`
    case knownCertificateTypes.phoneCert:
      return `Phone number certified by ${certifier.name}`
    case knownCertificateTypes.emailCert:
      return `Email address certified by ${certifier.name}`
    default:
      return `Certified by ${certifier.name}`
  }
}