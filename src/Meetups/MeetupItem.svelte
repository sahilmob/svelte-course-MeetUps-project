<script>
  import { createEventDispatcher } from "svelte";
  import Badge from "../UI/Badge.svelte";
  import meetups from "./meetups-store";
  import Button from "../UI/Button.svelte";
  import { FIREBASE_BASE_URL } from "../constants";

  export let id = "";
  export let title = "";
  export let subtitle = "";
  export let imageUrl = "";
  export let description = "";
  export let address = "";
  export let contactEmail = "";
  export let index = null;
  export let isFavorite;

  let isLoading = false;
  const dispatch = createEventDispatcher();

  function toggleFavorite(id) {
    isLoading = true;
    fetch(`${FIREBASE_BASE_URL}/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavorite: !isFavorite }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("An error occurred");
        meetups.toggleFavorite(id);
      })
      .catch(err => console.log(err))
      .finally(_ => {
        isLoading = false;
      });
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 100%;
    height: 14rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h1.is-favorite {
    background: #01a129;
    color: white;
    padding: 0 0.5rem;
    border-radius: 5px;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    font-size: 1.25rem;
    margin: 0;
  }

  div {
    text-align: right;
  }

  .content {
    height: 4rem;
  }
</style>

<article>
  <header>
    <h1>
       {title}
      {#if isFavorite}
        <Badge>Favorite</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button on:click={() => dispatch('edit', id)}>Edit</Button>
    <Button
      mode="outline"
      color={isFavorite ? null : 'success'}
      type="button"
      on:click={() => toggleFavorite(id)}
      disabled={isLoading}>
       {isLoading ? 'Loading' : isFavorite ? 'unfavorite' : 'Favorite'}
    </Button>
    <Button type="button" on:click={() => dispatch('showdetails', id)}>
      Show Details
    </Button>
  </footer>
</article>
