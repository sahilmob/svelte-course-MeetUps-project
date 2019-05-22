<script>
  export let meetups;
  import MeetupItem from "./MeetupItem.svelte";
  import MeetupFilter from "./MeetupFilter.svelte";

  let favsOnly = false;
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
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section id="meetup-controls">
  <MeetupFilter on:select={setFilter} {favsOnly} />
</section>
<section id="meetups">
  {#each filteredMeetups as { title, subtitle, description, imageUrl, address, contactEmail, id, isFavorite }, index}
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
  {/each}
</section>
