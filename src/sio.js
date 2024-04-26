import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false
})


const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3333'

export const sio = io(URL)


sio.on('connect', () => {
  state.connected = true
  console.log( 'WebSocket connected with ID = ' + sio.id )
})

sio.on('disconnect', () => {
  console.log( 'WebSocket disconnected with ID = ' + sio.id )
  state.connected = false
})
  
  