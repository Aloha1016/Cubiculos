<template>
    <div class="notice-panel">
      <h2>Avisos</h2>
      <div v-if="notices.length === 0" class="no-notices">
        No hay avisos en este momento.
      </div>
      <ul v-else class="notice-list">
        <li v-for="(notice, index) in notices" :key="index" class="notice-item">
          <div class="notice-header">
            <span class="notice-title">{{ notice.title }}</span>
            <span class="notice-date">{{ notice.date }}</span>
          </div>
          <div class="notice-content">{{ notice.content }}</div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notices: [
          //{ title: '¡Importante!', date: '2024-05-10', content: 'Se suspenden las clases mañana debido al mal tiempo.' },
        
        ]
      };
    }
  }
  </script>
  
  <style scoped>
  .notice-panel {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .notice-panel h2 {
    margin-bottom: 20px;
    font-size: 24px;
  }
  
  .no-notices {
    font-style: italic;
    margin-bottom: 10px;
  }
  
  .notice-list {
    list-style: none;
    padding: 0;
  }
  
  .notice-item {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 10px;
  }
  
  .notice-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
  }
  
  .notice-title {
    font-weight: bold;
  }
  
  .notice-date {
    color: #666;
  }
  
  .notice-content {
    margin-top: 5px;
  }
  </style>
  