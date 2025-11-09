import React from 'react'
import BasicIcons from './BasicIcons';



type PropTypes = {
  id: string;
  message?: string;
  handleDelete?: (id: string) => void;
  css?: string;
}

const DeletePermit = ({ id, handleDelete, message, css }: PropTypes) => {
  const modalId = `${id}-deletePermitModal`;
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className={`btn btn-outline  border-none btn-sm ${css}`} onClick={() => {
        const modal = document.getElementById(modalId) as HTMLDialogElement | null;
        modal?.showModal()
      }}>
        <BasicIcons label='trash' size={css} />
      </button>
      <dialog id={modalId} className="modal">
        <div className="modal-box w-xs">
          <h3 className="font-bold text-lg">Delete Permission!</h3>
         
          {message ? <p>{message}</p> :  <p className="">Do you really want to delete this?</p>}
          <div className="modal-action">
            <form method="dialog" className='w-full flex justify-between '>
              <button onClick={() => handleDelete?.(id)} className="btn btn-error text-white">Yes, delete it.</button>
              <button className="btn btn-ghost">No</button >
            </form>
          </div>
        </div>
      </dialog>


    </div>
  )
}

export default DeletePermit
