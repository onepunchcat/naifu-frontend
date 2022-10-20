export function getViteEnv(key: string, panic = true): string {
  const env: string | undefined = import.meta.env[key]
  if (env) return env
  if (!env && panic) throw new TypeError(`Env key ${key} not set`)
  return ''
}
