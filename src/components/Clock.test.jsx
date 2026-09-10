import { describe, it, expect, afterEach, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import Clock from './Clock'

describe('Clock', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('마운트 시 현재 시간을 화면에 표시한다', () => {
    vi.useFakeTimers()
    const now = new Date('2026-09-10T09:10:11')
    vi.setSystemTime(now)

    render(<Clock />)

    expect(screen.getByText(now.toLocaleTimeString('ko-KR'))).toBeInTheDocument()
  })

  it('1초마다 화면의 시간을 갱신한다', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-09-10T09:10:11'))

    render(<Clock />)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(
      screen.getByText(
        new Date('2026-09-10T09:10:12').toLocaleTimeString('ko-KR'),
      ),
    ).toBeInTheDocument()
  })
})