<template>
  <div class="chat-gpt-form">
    <h1>Create Jira Ticket with ChatGPT</h1>

    <!-- Title -->
    <div>
      <label>Title</label>
      <textarea v-model="jiraFields.title" />
      <button @click="generateTitle">Generate Title</button>
    </div>

    <!-- Description -->
    <div>
      <label>Description</label>
      <textarea v-model="jiraFields.description" />
      <button @click="generateDescription">Generate Description</button>
    </div>

    <!-- Acceptance Criteria -->
    <div>
      <label>Acceptance Criteria</label>
      <textarea v-model="jiraFields.acceptanceCriteria" />
      <button @click="generateAcceptanceCriteria">Generate Acceptance Criteria</button>
    </div>

    <!-- Agile Team Selector (need a Vue-compatible select component) -->
    <!-- Issue Type Selector (need a Vue-compatible select component) -->

    <!-- Create Jira Issue Button -->
    <button @click="createJiraIssue">Create Issue</button>

    <!-- Modal -->
    <div v-if="modal" class="modal">
      <!-- Modal Content -->
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { promptChatGPT } from '../services/backendService';

export default {
  name: 'ChatGPTForm',
  setup() {
    const jiraFields = ref({
      title: '',
      description: '',
      acceptanceCriteria: '',
      // ... other fields
    });
    const agileTeam = ref([]);
    const issueTypes = ref([]);
    const modal = ref(false);

    const generateTitle = async () => {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await promptChatGPT(jiraFields.value.title, 'gpt-3.5-turbo');
        // Process response to extract and set the generated title
      } catch (error) {
        console.error('Error generating title:', error);
      }
    };

    const generateDescription = async () => {
      // Call API and update jiraFields.description
    };

    const generateAcceptanceCriteria = async () => {
      // Call API and update jiraFields.acceptanceCriteria
    };

    const createJiraIssue = async () => {
      // Call API to create Jira issue
    };

    onMounted(async () => {

    });

    return {
      jiraFields,
      agileTeam,
      issueTypes,
      modal,
      generateTitle,
      generateDescription,
      generateAcceptanceCriteria,
      createJiraIssue
    };
  }
};
</script>

<style scoped>
/* CSS styles */
</style>
