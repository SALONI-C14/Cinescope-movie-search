import React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  it('renders input and button', () => {
    render(<SearchBar value="" onChange={() => {}} onSearch={() => {}} />)
    expect(screen.getByPlaceholderText(/Search for movies/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('accepts user input and calls onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    render(<SearchBar value="" onChange={handleChange} onSearch={() => {}} />)
    const input = screen.getByPlaceholderText(/Search for movies/i)
    await user.type(input, 'Inception')
    expect(handleChange).toHaveBeenCalled()
  })

  it('calls onSearch when Search button clicked', async () => {
    const user = userEvent.setup()
    const onSearch = vi.fn()
    render(<SearchBar value="" onChange={() => {}} onSearch={onSearch} />)
    await user.click(screen.getByRole('button', { name: /search/i }))
    expect(onSearch).toHaveBeenCalled()
  })

  it('calls onSearch when Enter is pressed', () => {
    const onSearch = vi.fn()
    const onChange = vi.fn()
    render(<SearchBar value="" onChange={onChange} onSearch={onSearch} />)
    const input = screen.getByPlaceholderText(/Search for movies/i)
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
    expect(onSearch).toHaveBeenCalled()
  })
})
