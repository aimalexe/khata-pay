import React from 'react'

export default function Help() {
  return (
    <div className="flex flex-col min-h-[84vh] justify-between">
      <div >
        <h1 className="  text-md font-bold text-green-700 mb-2">Help & Contact</h1>
        <div className='flex flex-col justify-center items-center' >
        <div className="text-center text-gray-700 text-sm space-y-2 bg-gray-50 w-1/2 mt-20 p-2">
          <div>
            <span className="font-semibold">Headquarters:</span><br />
              <p className='text-green-700' >University Road, Peshawar, Pakistan</p>
          </div>
          <div>
            <span className="font-semibold">Phone:</span><br />
            <a href="tel:+923001234567" className="text-green-700 hover:underline">+92 321 9158118</a>
          </div>
          <div>
            <span className="font-semibold">Email:</span><br />
            <a href="https://www.khatapay.com" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">www.khatapay.com.pk</a>
          </div>
        </div>
        </div>
      </div>
      <footer className="w-full  bg-[#0a6b1f] text-white text-center py-2">
        &copy; {new Date().getFullYear()} KhataPay. All rights reserved.
      </footer>
    </div>
  )
}
