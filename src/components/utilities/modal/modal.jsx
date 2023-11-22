import React from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

function Modal({ children, onClose, title }) {
  return (
    <>
      {createPortal(
        <>
          <div onClick={onClose} className="fixed inset-0 z-[2] h-full w-full bg-black bg-opacity-75"></div>
          <div className="fixed top-1/2 left-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 w-[80%] md:w-[50%]">
            <div className="bg-white border border-t-slate-400 grow rounded-lg">
              <div className="flex justify-end p-4">
                <button>
                  <HiXMark size={24} onClick={onClose} />
                </button>
              </div>
              <div className="p-4">{children}</div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}

export default Modal;
