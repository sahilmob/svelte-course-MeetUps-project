<script>
  export let meetups;
  import MeetupItem from "./MeetupItem.svelte";
</script>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  @media (min-width: 768px) {
    section {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<section class="meetups">
  {#each meetups as { title, subtitle, description, imageUrl, address, contactEmail, id, isFavorite }, index}
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
      on:showdetails />
  {/each}
</section>
