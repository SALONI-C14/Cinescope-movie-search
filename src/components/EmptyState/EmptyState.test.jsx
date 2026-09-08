import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  it('renders helpful prompt', () => {
    render(<EmptyState />)
    expect(screen.getByText(/Search for a movie to start exploring./i)).toBeInTheDocument()
    expect(screen.getByText(/Try keywords like/i)).toBeInTheDocument()
  })
})
