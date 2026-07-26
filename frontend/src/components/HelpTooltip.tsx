import React from 'react';

type Props = {
  children: React.ReactNode;
};

export function HelpTooltip({ children }: Props) {
  return (
    <div className='relative group inline-block ml-1'>
      <button
        type="button"
        className='text-gray-400 hover:text-gray-600 focus:outline-none'
        aria-label='ヘルプ'
      >
        ？
      </button>
      <div className='absolute hidden group-hover:block bottom-full mb-2 -left-1/2 w-64 p-3 bg-gray-800 text-white text-xs rounded-lg shadow-xl z-20 pointer-events-none'>
        {children}
      </div>
    </div>
  );
}
