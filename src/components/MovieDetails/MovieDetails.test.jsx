import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import MovieDetails from './MovieDetails'

const movie = {
  title: 'Accessible Movie', year: '2024', genre: 'Drama', runtime: '100 min',
  rating: '8.0', plot: 'A test plot.', director: 'A Director', actors: 'An Actor', poster: 'N/A'
}

describe('MovieDetails', () => {
  it('exposes a labelled modal dialog and closes with Escape', () => {
    const onClose = vi.fn()
    render(<MovieDetails movie={movie} loading={false} error={null} onClose={onClose} />)

    expect(screen.getByRole('dialog', { name: /accessible movie details/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /close/i })).toHaveFocus()
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
