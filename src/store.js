import { at, has, merge, omit, set } from 'lodash-es'
import create from 'zustand'

const SETTINGS_KEY = 'gtfo:settings'

const readSettings = () => {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '-')
  } catch {
    localStorage.setItem(SETTINGS_KEY, '{}')
    return {}
  }
}

const useSettings = create((update, read) => ({
  ...readSettings(),

  get: (key) => at(read(), key)[0],
  set: (key, value) =>
    update((settings) => {
      const newSettings = merge({}, settings, set({}, key, value))
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
      return newSettings
    }),
  delete: (key) =>
    update((settings) => {
      const newSettings = omit(settings, key)
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings))
      return newSettings
    }),
  has: (key) => has(read(), key),
}))

export default useSettings
