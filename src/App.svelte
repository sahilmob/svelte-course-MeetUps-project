<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import { codingImageUrl, swimmingImageUrl } from "./constants";
  import meetups from "./Meetups/meetups-store";

  let editMode;

  function addMeetup(event) {
    const { detail } = event;
    meetups.addMeetup(detail);
    editMode = null;
  }

  function cancelEdit() {
    editMode = null;
  }

  function toggleFavorite(event) {
    const { detail: index } = event;
    meetups.toggleFavorite(index);
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />

<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
  </div>

  {#if editMode === 'add'}
    <EditMeetup on:addmeetup={addMeetup} on:cancel={cancelEdit} />
  {/if}
  <MeetupGrid meetups={$meetups} on:togglefavorite={toggleFavorite} />
</main>
