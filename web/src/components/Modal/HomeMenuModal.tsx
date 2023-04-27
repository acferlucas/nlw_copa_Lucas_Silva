import Image from 'next/image'
import { ReactNode } from 'react';
import Modal from 'react-modal'

import logoModal from '../../assets/modalLogo.png'

interface CreatePollModalProps { 
  isOpen: boolean,
  children: ReactNode; 
  onCloseModal: () => void 
}

export function HomeMenuModal({ isOpen, onCloseModal, children }:CreatePollModalProps):JSX.Element {
  const modalStyle: Modal.Styles = {
    content: {
      width: '50%',
      height: '50%',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#323238',
      border: 0,
      borderRadius:8,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }
  }

  return (
    <Modal 
      isOpen={isOpen}
      style={modalStyle}
      onRequestClose={onCloseModal}
      ariaHideApp={false}
    >
      <div className='w-full text-left p-4'>
       <header className='w-full flex items-center justify-center'>
        <Image src={logoModal} alt="Application logo" />
       </header>
        {children}
      </div>
    </Modal>
  )
}