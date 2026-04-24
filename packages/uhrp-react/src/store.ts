import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { StorageUtils, StorageDownloader } from '@bsv/sdk'

// Initialize a single downloader instance
const downloader = new StorageDownloader()

interface UrlState {
  urls: Record<string, string>
  setResolvedURL: (uhrpUrl: string) => Promise<void>
}

export const useStore = create<UrlState>()(
  persist(
    (set, get) => ({
      urls: {},
      async setResolvedURL(uhrpUrl) {
        // If we’ve already resolved or stored this URL, skip
        if (get().urls[uhrpUrl]) return

        // If not a valid UHRP URL, store “as is”
        if (!StorageUtils.isValidURL(uhrpUrl)) {
          set(state => ({
            urls: { ...state.urls, [uhrpUrl]: uhrpUrl }
          }))
          return
        }

        // Otherwise, resolve the UHRP URL
        try {
          const [resolved] = await downloader.resolve(uhrpUrl)
          set(state => ({
            urls: { ...state.urls, [uhrpUrl]: resolved }
          }))
        } catch (err) {
          console.error(err)
        }
      }
    }),
    {
      name: 'uhrp-react-session',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)
