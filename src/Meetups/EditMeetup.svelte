<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";

  const dispatch = createEventDispatcher();

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let address = "";
  let contactEmail = "";
  let description = "";

  function submitForm() {
    dispatch("addmeetup", {
      title,
      subtitle,
      imageUrl,
      address,
      contactEmail,
      description
    });
  }
</script>

<style>
  form {
    width: 30rem;
    max-width: 90%;
    margin: auto;
  }
</style>

<form on:submit|preventDefault={submitForm}>
  <TextInput
    id="title"
    label="Title"
    value={title}
    on:input={event => (title = event.target.value)} />
  <TextInput
    id="subtitle"
    label="Subtitle"
    value={subtitle}
    on:input={event => (subtitle = event.target.value)} />
  <TextInput
    id="imageUrl"
    label="Image URL"
    value={imageUrl}
    on:input={event => (imageUrl = event.target.value)} />
  <TextInput
    id="address"
    label="Address"
    value={address}
    on:input={event => (address = event.target.value)} />

  <TextInput
    id="email"
    label="Email"
    controlType="email"
    value={contactEmail}
    on:input={event => (contactEmail = event.target.value)} />

  <TextInput
    id="description"
    label="Description"
    controlType="textarea"
    rows="3"
    value={description}
    on:input={event => (description = event.target.value)} />
  <Button type="submit" caption="Save" />
</form>
