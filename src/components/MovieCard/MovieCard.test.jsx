import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MovieCard from './MovieCard'

const sample = {
  imdbID: 'tt123',
  title: 'Sample Movie',
  year: '2020',
  type: 'movie',
  poster: 'https://example.com/poster.jpg'
}

describe('MovieCard', () => {
  it('renders movie details and image', () => {
    render(<MovieCard movie={sample} onSelect={() => {}} />)
    expect(screen.getByText(/Sample Movie/)).toBeInTheDocument()
    expect(screen.getByText(/2020/)).toBeInTheDocument()
    expect(screen.getByAltText(/Sample Movie poster/)).toBeInTheDocument()
  })

  it('calls onSelect when clicked or Enter pressed', async () => {
    const onSelect = vi.fn()
    render(<MovieCard movie={sample} onSelect={onSelect} />)
    await userEvent.click(screen.getByText(/Sample Movie/))
    expect(onSelect).toHaveBeenCalledWith('tt123')
    const card = screen.getByRole('article') || screen.getByText(/Sample Movie/).closest('article')
    fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' })
    expect(onSelect).toHaveBeenCalled()
  })

  it('shows placeholder when no poster', () => {
    const noPoster = { ...sample, poster: 'N/A' }
    render(<MovieCard movie={noPoster} onSelect={() => {}} />)
    expect(screen.getByText(/No Image/i)).toBeInTheDocument()
  })

  it('details button stops propagation and calls onSelect', async () => {
    const onSelect = vi.fn()
    render(<MovieCard movie={sample} onSelect={onSelect} />)
    await userEvent.click(screen.getByRole('button', { name: /view details/i }))
    expect(onSelect).toHaveBeenCalledWith('tt123')
  })
})
