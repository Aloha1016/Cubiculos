<template>
  <div class="page-container">
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div class="container-fluid"> 
          <div class="navbar-brand me-2">
            <img
              src="@/assets/logo2.png"
              height="30"
              loading="lazy"
              alt="Logo"
            />
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="navbarButtonsExample">
            <ul class="navbar-nav mb-2 mb-lg-0">
            </ul>
            <div id="Buttons" class="d-flex align-items-center">
              <router-link to="/login" class="btn btn-link px-3 me-2">Iniciar Sesión</router-link>
              <router-link to="/register" class="btn btn-primary me-3 rounded-pill">Registrarse</router-link>
            </div>
          </div>
        </div>
      </nav>

      <div class="image-container">
        <transition name="fade">
          <img :key="currentIndex" :src="currentImage" :alt="'Image ' + (currentIndex + 1)" class="image">
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'HomeView',
  setup() {
    const images = [
      require('@/assets/imagen1.jpg'),
      require('@/assets/imagen2.jpg')
    ];
    const currentIndex = ref(0);
    let intervalId = null;

    const startSlideshow = () => {
      intervalId = setInterval(() => {
        nextImage();
      }, 5000);
    };

    const stopSlideshow = () => {
      clearInterval(intervalId);
    };

    const nextImage = () => {
      currentIndex.value = (currentIndex.value + 1) % images.length;
      currentImage.value = images[currentIndex.value];
    };

    const currentImage = ref(images[currentIndex.value]);

    onMounted(() => {
      startSlideshow();
    });

    onBeforeUnmount(() => {
      stopSlideshow();
    });

    return {
      images,
      currentIndex,
      currentImage
    };
  }
};
</script>

<style scoped>
.navbar {
  background-color: #f6f6f6;
  padding-top: 5px;
  padding-bottom: 5px;
}
.navbar-brand img {
  height: 150px;
}
.btn.btn-primary {
  padding: 10px 20px;
  background-color: #c9a400; 
  border-color: #c9a400; 
  color: white; 
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn.btn-link {
  padding: 10px 20px;
}
.image-container {
  height: 755px; 
  position: relative; 
}
.image-container img {
  width: 100%; 
  height: 100%; 
  display: block; 
  object-fit: cover; 
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
#Buttons {
  position: absolute; 
  bottom: 20px; 
  right: 20px;
  top: 25px; 
}
.page-container {
  overflow: hidden;
}
</style>