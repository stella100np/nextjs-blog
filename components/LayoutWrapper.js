import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Logo from '@/data/logo.svg'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'

const LayoutWrapper = ({ children }) => {
  const router = useRouter()
  const [selectedLink, setSelectedLink] = useState(router.pathname)
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between py-10">
          <div>
            <Link href="/" aria-label={siteMetadata.headerTitle}>
              <div className="flex items-center justify-between">
                <div className="mr-3">
                  <Logo />
                </div>
                {typeof siteMetadata.headerTitle === 'string' ? (
                  <div className="hidden h-6 text-2xl font-semibold sm:block">
                    {siteMetadata.headerTitle}
                  </div>
                ) : (
                  siteMetadata.headerTitle
                )}
              </div>
            </Link>
          </div>
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  onClick={() => setSelectedLink(link.href)}
                  className={`relative p-1 font-medium  hover:text-primary-600 focus:text-primary-600 dark:text-gray-100 sm:p-4 ${
                    selectedLink == link.href ? 'text-primary-600' : 'text-gray-900'
                  }`}
                >
                  {link.title}
                  {selectedLink == link.href ? (
                    <motion.div
                      layoutId="underline"
                      className="absolute top-3 left-0 h-7 w-full bg-primary-400/10 dark:bg-primary-600 rounded-md -z-10"
                    />
                  ) : null}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
