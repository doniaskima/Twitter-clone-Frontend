import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  return (
  <div className="flex px-2 py-1 items-center relative">
    Header
  </div>
  )
}

export default Header