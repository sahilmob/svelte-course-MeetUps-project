<script>
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Header from "./UI/Header.svelte";
  import Button from "./UI/Button.svelte";
  import { codingImageUrl, swimmingImageUrl } from "./constants";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code",
      imageUrl: codingImageUrl,
      address: "27th Nerd Road, 324325 New York",
      contactEmail: "code@test.com",
      isFavorite: false
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "We will simply, swim some rounds!",
      imageUrl: swimmingImageUrl,
      address: "27th Nerd Road, 324325 New York",
      contactEmail: "swim@test.com",
      isFavorite: false
    }
  ];

  let editMode;

  function addMeetup(event) {
    const { detail } = event;
    const newMeetup = {
      id: Math.random().toString(),
      ...detail
    };

    meetups = [newMeetup, ...meetups];
  }

  function toggleFavorite(event) {
    const { detail: index } = event;
    const updtedMeetup = { ...meetups[index] };
    updtedMeetup.isFavorite = !updtedMeetup.isFavorite;
    meetups = [
      ...meetups.slice(0, index),
      updtedMeetup,
      ...meetups.slice(index + 1)
    ];
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
    <Button caption="New Meetup" on:click={() => (editMode = 'add')} />
  </div>

  {#if editMode === 'add'}
    <EditMeetup on:addmeetup={addMeetup} />
  {/if}
  <MeetupGrid {meetups} on:togglefavorite={toggleFavorite} />
</main>
