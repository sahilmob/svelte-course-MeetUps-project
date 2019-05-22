<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetails from "./Meetups/MeetupDetails.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import { codingImageUrl, swimmingImageUrl } from "./constants";
  import meetups from "./Meetups/meetups-store";

  let editMode;
  let page = "overview";
  let selectedMeetupId;

  function addMeetup() {
    editMode = null;
    selectedMeetupId = null;
  }

  function cancelEdit() {
    editMode = null;
    selectedMeetupId = null;
  }

  function showDetails(event) {
    selectedMeetupId = event.detail;
    page = "details";
  }

  function closeDetails() {
    page = "overview";
    selectedMeetupId = null;
  }

  function editMeetup(event) {
    editMode = "add";
    selectedMeetupId = event.detail;
  }

  function deleteMeetup(event) {
    meetups.deleteMeetup(event.detail);
    selectedMeetupId = null;
    editMode = null;
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
  {#if page === 'overview'}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = 'add')}>New Meetup</Button>
    </div>

    {#if editMode === 'add'}
      <EditMeetup
        on:addmeetup={addMeetup}
        on:cancel={cancelEdit}
        on:delete={deleteMeetup}
        id={selectedMeetupId} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={editMeetup} />
  {:else if page === 'details'}
    <MeetupDetails id={selectedMeetupId} on:close={closeDetails} />
  {/if}
</main>
