import type { TalkStatus } from '../data/resume'

export function talkBadgeLabel(status: TalkStatus): string {
  return status === 'upcoming' ? 'Upcoming' : 'Speaker'
}

export function talkBadgeIsPulsing(status: TalkStatus): boolean {
  return status === 'upcoming'
}
