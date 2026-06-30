import { useState } from 'react'
import { MAX_PLAYER_NAME_LENGTH } from '../../constants/config'
import Button from '../ui/Button'
import Panel from '../ui/Panel'

function ProfilePanel({ name, onSaveName }) {
  const [inputName, setInputName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!onSaveName(inputName)) return

    setInputName('')
    event.currentTarget.elements.playerName.blur()
  }

  return (
    <Panel
      className="flex items-center justify-between gap-5 p-5 max-md:flex-col max-md:items-stretch"
      aria-label="Player profile"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-linear-to-br from-brand to-success text-lg font-black text-[#08111f]" aria-hidden="true">
          {name.charAt(0).toUpperCase() || 'G'}
        </span>
        <div>
          <strong className="block">Welcome, {name}</strong>
          <span className="mt-1 block text-xs text-muted">Your name and scores are saved on this device.</span>
        </div>
      </div>

      <form className="flex gap-2 max-sm:flex-col" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="playerName">Player name</label>
        <input
          id="playerName"
          name="playerName"
          type="text"
          maxLength={MAX_PLAYER_NAME_LENGTH}
          value={inputName}
          onChange={(event) => setInputName(event.target.value)}
          placeholder={name === 'Guest' ? 'Enter your name' : 'Change player name'}
          autoComplete="nickname"
          className="min-h-10 w-[min(220px,42vw)] rounded-lg border border-white/10 bg-[#131d2c] px-3 text-ink focus:border-brand focus:outline-3 focus:outline-brand/15 max-md:flex-1 max-md:w-full"
        />
        <Button type="submit">Save player</Button>
      </form>
    </Panel>
  )
}

export default ProfilePanel
