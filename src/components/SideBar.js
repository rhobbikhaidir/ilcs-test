import React from 'react'

const SideBar = (props) => {
  return (
    <div className="border border-gray-400 w-1/4 mr-6 pt-10 ">
      <div className='text-lg text-gray-800 pl-10 py-4'>
        <button
          onClick={props.onBack}
        >
          Perusahan
        </button>
      </div>
      <div className='text-lg text-gray-800 pl-10 py-4'>

      <button onClick={props.onClick} disabled={props.disabled}>
        Barang
      </button>
      </div>
    </div>
  );
}

export default SideBar