<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetails from "./Meetups/MeetupDetails.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import Loading from "./UI/Loading.svelte";
  import Error from "./UI/Error.svelte";
  import meetups from "./Meetups/meetups-store";
  import { FIREBASE_BASE_URL } from "./constants";

  let page = "overview";
  let isLoading = true;
  let editMode;
  let selectedMeetupId;

  let error;

  fetch(`${FIREBASE_BASE_URL}/meetups.json`)
    .then(res => {
      if (!res.ok) throw new Error("An error occurred, try again later.");
      return res.json();
    })
    .then(data => {
      const transformedMeetup = Object.keys(data).map(key => {
        return {
          ...data[key],
          id: key
        };
      });
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(transformedMeetup.reverse());
      }, 1000);
    })
    .catch(err => {
      error = err;
      isLoading = false;
      console.log(err);
    });

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
    const { detail: id } = event;
    fetch(`${FIREBASE_BASE_URL}/meetups/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("An error occurred");
        meetups.deleteMeetup(id);
        selectedMeetupId = null;
        editMode = null;
      })
      .catch(err => console.log(err));
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if error}
  <Error message={error} on:cancel={() => (error = null)} />
{/if}

<Header />

<main>
  {#if page === 'overview'}
    {#if editMode === 'add'}
      <EditMeetup
        on:addmeetup={addMeetup}
        on:cancel={cancelEdit}
        on:delete={deleteMeetup}
        id={selectedMeetupId} />
    {/if}
    {#if isLoading}
      <Loading />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:showdetails={showDetails}
        on:edit={editMeetup}
        on:add={editMeetup} />
    {/if}
  {:else if page === 'details'}
    <MeetupDetails id={selectedMeetupId} on:close={closeDetails} />
  {/if}
</main>
