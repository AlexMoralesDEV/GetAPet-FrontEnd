import bus from '../utils/Bus'

export default function useFlashMessage(){

    function setFlashMessage(msg, type){
        bus.emit('Flash', {
            message: msg,
            type: type
        })

        return { setFlashMessage }
    }

}