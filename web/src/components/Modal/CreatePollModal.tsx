import Image from 'next/image'
import Modal from 'react-modal'

import logoModal from '../../assets/modalLogo.png'

interface CreatePollModalProps { 
  isOpen: boolean, 
  onCloseModal: () => void 
}

export function CreatePollModal({ isOpen, onCloseModal }:CreatePollModalProps):JSX.Element {
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
       <h1 className='mt-16 text-white text-3xl font-bold'>Crie seu próprio bolão da copa e compartilhe entre amigos!</h1>
       <input 
        type="text" 
        className=' mt-4 px-6 py-4 rounded bg-gray-800 border-gray-600 text-lg text-gray-100 w-full' 
        placeholder='Qual nome do seu bolão'
        />
        <button  
          className='mt-4 px-6 py-4 rounded bg-yellow-500 text-gray-900 font-bold text-lg uppercase hover:bg-yellow-700 w-full' 
          type='button'>Criar meu bolão
        </button>
        <span className='flex mt-4 text-white leading-relaxed'>
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas.
        </span>
      </div>
    </Modal>
  )
}