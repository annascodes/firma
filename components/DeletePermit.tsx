import React from 'react'
import BasicIcons from './BasicIcons';



type PropTypes = {
  id: string;
  message?: string;
  handleDelete?: (id: string) => void;
}

const DeletePermit = ({ id, handleDelete, message }: PropTypes) => {
  const modalId = `${id}-deletePermitModal`
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn btn-outline  border-none btn-sm" onClick={() => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        modal?.showModal()
      }}>
        <BasicIcons label='trash' />
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Delete Permission!</h3>
          <p className="">Do you really want to delete this?</p>
          {message && <p>{message}</p>}
          <div className="modal-action">
            <form method="dialog" className='w-full flex justify-between '>
              <button onClick={()=>handleDelete?.(id)} className="btn btn-error text-white">Yes, delete it.</button>
              <button className="btn btn-ghost">No</button >
            </form>
          </div>
        </div>
      </dialog>


    </div>
  )
}

export default DeletePermit
