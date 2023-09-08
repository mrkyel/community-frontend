'use client'

import React, { useState, useEffect } from 'react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className="h-[50px]"
      // className={`fixed top-0 left-0 right-0 bg-white shadow-md transition-transform ease-in-out duration-300 ${
      //   isScrolled ? 'translate-y-0' : '-translate-y-full hidden'
      // }`}
    >
      커뮤니티 만들기
    </header>
  )
}

export default Header
