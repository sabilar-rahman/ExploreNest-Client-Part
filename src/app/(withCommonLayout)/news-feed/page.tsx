import AllPost from '@/src/components/modules/allPost/AllPost';
import React from 'react';

const page = () => {
  return (
    <div className='flex flex-shrink-0 justify-center'>
      {/* Left Section */}
      <div className='hidden lg:block sticky top-0 w-1/4 p-4'>
        <h2 className='text-lg font-semibold mb-4'>You May Know</h2>
        {/* Card 1 */}
        <div className=' shadow-md rounded-lg p-4'>
          <div className='flex items-center space-x-4'>
            <img className='w-12 h-12 rounded-full' src='https://res.cloudinary.com/dr7bkozhr/image/upload/v1730993176/ga6118lyz7-1730993172058-ronaldo.jpg' alt='Profile 1' />
            <div>
              <h3 className='font-medium'>Ronaldo</h3>
              <button className='text-blue-500 text-sm mt-2'>Connect</button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className='shadow-md rounded-lg p-4'>
          <div className='flex items-center space-x-4'>
            <img className='w-12 h-12 rounded-full' src='https://res.cloudinary.com/dr7bkozhr/image/upload/v1730879881/bn1w0l7czpf-1730879879389-admin%20image.jpg' alt='Profile 2' />
            <div>
              <h3 className='font-medium'>Admin Profile</h3>
              <button className='text-blue-500 text-sm mt-2'>Connect</button>
            </div>
          </div>
        </div>
        <div className='shadow-md rounded-lg p-4'>
          <div className='flex items-center space-x-4'>
            <img className='w-12 h-12 rounded-full' src='https://res.cloudinary.com/dr7bkozhr/image/upload/v1731031908/fmfpl576vj-1731031908768-pro.jpg' alt='Profile 2' />
            <div>
              <h3 className='font-medium'>User Sabilar..</h3>
              <button className='text-blue-500 text-sm mt-2'>Connect</button>
            </div>
          </div>
        </div>
        <div className=' shadow-md rounded-lg p-4'>
          <div className='flex items-center space-x-4'>
            <img className='w-12 h-12 rounded-full' src='https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Profile 2' />
            <div>
              <h3 className='font-medium'>new user</h3>
              <button className='text-blue-500 text-sm mt-2'>Connect</button>
            </div>
          </div>
        </div>
      </div>

      {/* Center Section with Posts */}
      <AllPost />

      {/* Right Section */}
      <div className='hidden lg:block sticky top-0 w-1/4 p-4'>
        {/* People You May Know */}
        <h2 className='text-lg font-semibold mb-4'>You May Know</h2>
        {/* Card 1 */}
        <div className=' shadow-md rounded-lg p-4 mb-4'>
          <div className='flex items-center space-x-4'>
            <img className='w-12 h-12 rounded-full' src='https://i.ibb.co.com/vkVW6s0/download.png' alt='Profile 3' />
            <div>
              <h3 className='font-medium'>kangaroo</h3>
              <button className='text-blue-500 text-sm mt-2'>Connect</button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className=' shadow-md rounded-lg p-4'>
          <div className='flex items-center space-x-4'>
            <img className='w-12 h-12 rounded-full' src='https://images.pexels.com/photos/279949/pexels-photo-279949.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='Profile 4' />
            <div>
              <h3 className='font-medium'>Naim</h3>
              <button className='text-blue-500 text-sm mt-2'>Connect</button>
            </div>
          </div>
        </div>

{/* Policy & User Terms Section */}
<div className='mt-6'>
  <h2 className='text-lg font-semibold mb-4'>Legal</h2>
  <ul>
    <li>
      <a href='/policy' className='text-blue-500'>Privacy Policy</a>
    </li>
    <li>
      <a href='/terms' className='text-blue-500'>User Terms</a>
    </li>
  </ul>
</div>

{/* More Info Section */}
<div className='mt-6'>
  <h2 className='text-lg font-semibold mb-4'>More Info</h2>
  <p className='text-sm text-gray-600'>
    For any inquiries or additional information, feel free to contact us at <a href='mailto:sabilarrahman36@gmail.com' className='text-blue-500'>sabilarrahman36@gmail.com</a>.
  </p>
</div>

{/* Copyright Section */}
<div className='mt-6 text-center'>
  <p className='text-sm text-gray-600'>
    &copy; {new Date().getFullYear()} Explore Nest. All rights reserved.
  </p>
</div>




      </div>
    </div>
  );
};

export default page;
