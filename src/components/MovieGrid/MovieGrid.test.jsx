import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MovieGrid from './MovieGrid'

const movies = [
  { imdbID: 'a1', title: 'First', year: '2001', type: 'movie', poster: 'N/A' },
  { imdbID: 'b2', title: 'Second', year: '2002', type: 'movie', poster: 'N/A' }
]

describe('MovieGrid', () => {
  it('renders multiple movies and propagates onSelect', async () => {
    const onSelect = vi.fn()
    await userEvent.setup()
    render(<MovieGrid movies={movies} onSelect={onSelect} />)
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
    await userEvent.click(screen.getByText('Second'))
    expect(onSelect).toHaveBeenCalledWith('b2')
  })
})
