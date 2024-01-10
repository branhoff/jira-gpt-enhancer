<template>
  <div class="chat-gpt-form">
    <h1>Create Jira Ticket with ChatGPT</h1>
    <div class="form-group">
      <label>Title</label>
      <textarea v-model="jiraFields.summary" />
      <button @click="getTitle">Generate Title</button>
    </div>
    <!-- Fields -->
  </div>
</template>

<script>
import { ref } from 'vue';
// import { getTitleFromGPT, postToCreateJiraIssue } from '../services/chatGPTService';

export default {
  name: 'ChatGPTForm',
  setup() {
    const jiraFields = ref({
      summary: '',
      description: '',
      acceptanceCriteria: '',
    });

    return {
      jiraFields,
      // getTitle,
    };
  }
};
</script>

<style scoped>
/* CSS styles */
</style>
