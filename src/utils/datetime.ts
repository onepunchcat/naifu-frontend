import { DateTime } from 'luxon'

export function isHistorical(seconds: number): boolean {
  const dateTime = DateTime.fromSeconds(seconds)
  const nowEpoch = DateTime.now().toSeconds()
  return nowEpoch >= dateTime.toSeconds()
}

export function isFuture(seconds: number): boolean {
  const dateTime = DateTime.fromSeconds(seconds)
  const nowEpoch = DateTime.now().toSeconds()
  return nowEpoch < dateTime.toSeconds()
}
