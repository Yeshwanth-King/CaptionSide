'use client';
import { useState, useEffect } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { GiMagicAxe } from 'react-icons/gi';
import Logo from '@/assets/Resources/logo.svg';
import User from '@/assets/Resources/User.svg';
import Image from 'next/image';
import { getSession, signOut } from 'next-auth/react';
import type { CustomUser } from '@/types';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import Notification from './Notification';

interface NavbarProps {
  bgColor?: string;
}

export default function Navbar({ bgColor = '#110219' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const sessionData = await getSession();
      setSession(sessionData);
      setLoading(false);
    }
    fetchSession();
  }, []);

  const user = (session?.user as CustomUser) || null;

  async function getSessionData() {
    const sessionData = await getSession();
  }
  getSessionData();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    if (isOpen) toggleMenu(); // Close menu on link click for mobile
  };

  return (
    <header
      className="py-3 text-white font-proxima-nova"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={Logo}
                alt="Logo"
                width={224}
                height={224}
                className="w-56 h-56"
              />
            </Link>
          </div>
          <div className="hidden ml-5 md:flex md:items-center md:space-x-4">
            <Link
              href="/events"
              className={`text-md ${
                activeLink === 'events'
                  ? 'text-fuchsia-600'
                  : 'hover:text-fuchsia-600'
              }`}
              onClick={() => handleLinkClick('events')}
            >
              Events
            </Link>
            <Link
              href="gamePass"
              className={`text-md ${
                activeLink === 'gamePass'
                  ? 'text-fuchsia-600'
                  : 'hover:text-fuchsia-600'
              }`}
              onClick={() => handleLinkClick('gamePass')}
            >
              Game Pass
            </Link>
            <Link
              href="/aboutus"
              className={`text-md ${
                activeLink === 'aboutUs'
                  ? 'text-fuchsia-600'
                  : 'hover:text-fuchsia-600'
              }`}
              onClick={() => handleLinkClick('aboutUs')}
            >
              About Us
            </Link>
            {session && (
              <Link
                href={`/user/${encodeURI(session.user.name)}`}
                className={`text-md ${
                  activeLink === 'aboutUs'
                    ? 'text-fuchsia-600'
                    : 'hover:text-fuchsia-600'
                }`}
                onClick={() => handleLinkClick('user/${userid}')}
              >
                My Account
              </Link>
            )}
            {session && (
              <Link
                href={`/marketPlace`}
                className={`text-md ${
                  activeLink === 'aboutUs'
                    ? 'text-fuchsia-600'
                    : 'hover:text-fuchsia-600'
                }`}
                onClick={() => handleLinkClick('Market Place')}
              >
                Market Place
              </Link>
            )}
          </div>
          <div className="hidden md:flex ml-20 md:items-center">
            <div className="relative flex items-center">
              {loading ? (
                <div className="w-[160px] flex items-center justify-center gap-2">
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                </div>
              ) : session ? (
                <div className="w-[160px] flex items-center gap-2">
                  <Notification />
                  <div className="flex items-center">
                    <Image
                      src={session.user?.image || User}
                      alt="User Avatar"
                      width={40}
                      height={40}
                      className="rounded-full mr-2"
                    />
                    <button
                      onClick={() => signOut()}
                      className="text-white hover:text-fuchsia-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="w-[160px] flex items-center justify-center">
                  <Link
                    href="/login"
                    prefetch={false}
                    className=" relative text-white px-3.5 py-0.5 text-base font-semibold overflow-hidden"
                    onClick={() => handleLinkClick('login')}
                  >
                    <div className="pentagon bg-[#d600e1] absolute inset-0"></div>
                    <span className="relative text-black z-10 text-center">
                      Login
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
            >
              {isOpen ? (
                <GiMagicAxe className="h-6 w-6" />
              ) : (
                <CiMenuFries className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/events"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'events' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('events')}
            >
              Events
            </Link>
            <Link
              href="/gamePass"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'gamePass' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('gamePass')}
            >
              Game Pass
            </Link>
            <Link
              href="/aboutus"
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeLink === 'aboutUs' ? 'bg-gray-700' : 'hover:bg-gray-700'
              }`}
              onClick={() => handleLinkClick('aboutUs')}
            >
              About Us
            </Link>
            {session && (
              <Link
                href={`/user/${encodeURI(session.user.name)}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeLink === 'aboutUs' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => handleLinkClick('user/${userid}')}
              >
                My Account
              </Link>
            )}

            {session ? (
              <div className="flex items-center gap-2">
                <Notification />
                <div className="flex items-center px-3 py-2">
                  <Image
                    src={session.user?.image || User}
                    alt="User Avatar"
                    width={32}
                    height={32}
                    className="rounded-full mr-2"
                  />
                  <button
                    onClick={() => {
                      signOut();
                    }}
                    className="px-3 py-2 rounded-md text-base font-medium"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeLink === 'login' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
                onClick={() => handleLinkClick('login')}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
