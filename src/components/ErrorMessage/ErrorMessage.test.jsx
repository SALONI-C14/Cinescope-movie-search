import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorMessage from './ErrorMessage'

describe('ErrorMessage', () => {
  it('displays message and retry button', async () => {
    const onRetry = vi.fn()
    render(<ErrorMessage message="Something went wrong" onRetry={onRetry} />)
    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /retry/i }))
    expect(onRetry).toHaveBeenCalled()
  })

  it('renders without retry button when onRetry not provided', () => {
    render(<ErrorMessage message="Minor issue" />)
    expect(screen.queryByRole('button', { name: /retry/i })).toBeNull()
  })
})
