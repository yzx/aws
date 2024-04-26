<script setup>
import { ref } from 'vue'
import { sio } from '@/sio'

const counter = ref(0)

const cards = ref([
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ])

const sendMgs = (data) => {
  console.log( 'WebSocket with ID = ' + sio.id + ' sending message -> ' + data )
  sio.emit('message', data)
}

sio.on('message', (data) => {
  console.log( 'WebSocket with ID = ' + sio.id + ' received message of the length = ' + data.length + ' -> ' + data )
  if (data === '+') {
    counter.value++
  }
  else if ((data === '-')) {
    counter.value-- 
  }
})

</script>

<template>
  <div class="dash">

    <h1>
      User Interface <br /> WebSocket I/O
    </h1>

    <div>
      <v-btn icon="mdi-minus" size="x-large" @click="sendMgs('-')"></v-btn>
      <span class="counter">{{ counter }}</span>
      <v-btn icon="mdi-plus" size="x-large" @click="sendMgs('+')"></v-btn>
    </div>

    <v-card class="mx-auto" max-width="500">


<v-container fluid>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card>
            <v-img
              :src="card.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="text-white" v-text="card.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="surface-variant" icon="mdi-heart" size="small" variant="text"></v-btn>

              <v-btn color="surface-variant" icon="mdi-bookmark" size="small" variant="text"></v-btn>

              <v-btn color="surface-variant" icon="mdi-share-variant" size="small" variant="text"></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>




    </v-card>

  </div>
</template>

<style scoped>

.dash {
  text-align: center;
  padding: 40px;
}

.counter {
  font-size: 80px;
  margin: 20px;
}

</style>
