import * as React from 'react'
import { Link } from 'gatsby'
import icons from "./../contents/icons"
import { useTimeoutBooleanState } from '../hooks/customHooks';

const links = [
  { url: "/", title: "Home" },
  { url: "/demo", title: "Demo" },
  { url: "/about", title: "About" }
];

type Props = {
  pageTitle: string,
  children: React.ReactNode
}

const Layout = ({pageTitle, children}: Props) => {

  const [isSpinning, setIsSpinning] = useTimeoutBooleanState(false, 3000);
  
  return (
    <div>
      <nav className='text-black bg-white flex shadow-md'>
        <div className='flex justify-center items-center m-1'>
          <svg onMouseEnter={() => setIsSpinning(true)} className={`${isSpinning ? "animate-spin" : ""} hover:animate-spin h-10 w-10`} viewBox="0 0 24 24">
            <path fill="currentColor" d={icons.svgPaths.fan} />
          </svg>
          <div className='ml-2'>
            <Link to={links[0].url}>Fan Control</Link> {">"} {pageTitle}
          </div>
        </div>
        <ul className='flex ml-auto justify-center items-center'>
          {links.map(link => <li key={link.title} className='p-3'><Link to={link.url}>{link.title}</Link></li>)}
        </ul>
      </nav>

      <main className='p-5'>
        {children}
      </main>

    </div>
  )
}

export default Layout