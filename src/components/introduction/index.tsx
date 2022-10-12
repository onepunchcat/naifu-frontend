import React from 'react'
import { Link } from 'react-router-dom'

import { classNames } from '../../utils'
import { IconArrowRight } from '../icon'
import { LogoUnstableDiffusion } from '../logo'

type ContentProps = Required<React.PropsWithChildren> & {
  className?: string
}

function Content(props: ContentProps) {
  return <p className={classNames('text-4 leading-6 text-white', props.className)}>{props.children}</p>
}

type ExternalLinkProps = React.ComponentPropsWithoutRef<'a'> & {
  className?: string
}

function ExternalLink(props: ExternalLinkProps) {
  return (
    <a className={classNames('group flex flex-row items-center', 'text-8 text-white', props.className)} {...props}>
      {props.children}
      <IconArrowRight className="ml-3 w-8 -rotate-45 transition-opacity opacity-100 lg:opacity-0 group-hover:opacity-100" />
    </a>
  )
}

export function Introduction() {
  return (
    <section id="introduction" className="flex flex-col shrink-0 gap-3 md:gap-5 lg:gap-8 lg:w-80">
      <Link to="/">
        <LogoUnstableDiffusion className="mb-3 md:mb-5 lg:mb-16" />
      </Link>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Content>
      <Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </Content>
      <div className="flex flex-col gap-3 lg:mt-8">
        <ExternalLink href="https://ethereum.org/en/whitepaper/" target="_blank" rel="noopener">
          Whitepaper
        </ExternalLink>
      </div>
    </section>
  )
}
