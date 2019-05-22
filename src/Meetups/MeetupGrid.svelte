<script>
  import { createEventDispatcher } from "svelte";
  import { flip } from "svelte/animate";
  import { scale } from "svelte/transition";

  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";
  import Button from "../UI/Button.svelte";

  export let meetups;

  let favsOnly = false;
  const dispatch = createEventDispatcher();

  $: filteredMeetups = favsOnly ? meetups.filter(m => m.isFavorite) : meetups;

  function setFilter(event) {
    if (event.detail == 1) {
      favsOnly = true;
    } else {
      favsOnly = false;
    }
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    margin: 1rem;
    display: flex;
    justify-content: space-between;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} {favsOnly} />
  <Button on:click={() => dispatch('add')}>New Meetup</Button>
</section>
<section id="meetups">
  {#each filteredMeetups as { title, subtitle, description, imageUrl, address, contactEmail, id, isFavorite }, index (id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem
        {id}
        {title}
        {subtitle}
        {description}
        {imageUrl}
        {address}
        {contactEmail}
        {index}
        {isFavorite}
        on:showdetails
        on:edit />
    </div>
  {/each}
</section>
