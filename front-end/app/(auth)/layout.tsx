'use client'

import React from "react"

import { PawPrint } from 'lucide-react'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Decorative paw prints */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-5">
        <PawPrint className="absolute left-[10%] top-[20%] h-24 w-24 rotate-12 text-primary" />
        <PawPrint className="absolute right-[15%] top-[30%] h-16 w-16 -rotate-12 text-accent" />
        <PawPrint className="absolute bottom-[25%] left-[20%] h-20 w-20 rotate-45 text-primary" />
        <PawPrint className="absolute bottom-[15%] right-[10%] h-28 w-28 -rotate-6 text-accent" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-8 md:py-10">
        {/* Toggle de tema (canto direito) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <ThemeToggle />
        </div>

        {/* Logo central */}
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex items-center gap-3 transition-transform hover:scale-105"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/30">
              <PawPrint className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">PetShop</span>
          </Link>
        </div>
      </header>


      {/* Main content */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 pb-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PetShop. All rights reserved.</p>
      </footer>
    </div>
  )
}
