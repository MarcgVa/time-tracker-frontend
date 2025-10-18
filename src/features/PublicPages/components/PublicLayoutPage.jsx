import React from 'react'
import { Outlet } from 'react-router-dom'

export const PublicLayoutPage = () => {
  return (
    <>
      <main className="flex bg-gradient-to-b from-gray-900 to-gray-950">
        <Outlet />
      </main>
    </>
  );
}
