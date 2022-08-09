import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import IconMoon from '~icons/heroicons-outline/moon.jsx'
import IconSun from '~icons/heroicons-outline/sun.jsx'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="ml-1 mr-1 h-8 w-8 rounded p-1 sm:ml-4"
      onClick={() => setTheme(theme === 'dark' || resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && (theme === 'dark' || resolvedTheme === 'dark') ? (
        <IconMoon className="h-6 w-6  dark:text-primary-500" />
      ) : (
        <IconSun className="h-6 w-6  text-primary-600" />
      )}
    </button>
  )
}

export default ThemeSwitch
