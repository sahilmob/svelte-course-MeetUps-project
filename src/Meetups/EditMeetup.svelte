<script>
  import { createEventDispatcher } from "svelte";
  import meetups from "./meetups-store";

  import Modal from "../UI/Modal.svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import { isEmpty, isValidEmail } from "../helpers/validation";

  const dispatch = createEventDispatcher();

  let title = "";
  let subtitle = "";
  let imageUrl = "";
  let address = "";
  let contactEmail = "";
  let description = "";

  function submitForm() {
    if (!formIsValid) {
      return;
    }

    meetups.addMeetup({
      title,
      subtitle,
      imageUrl,
      address,
      contactEmail,
      description
    });

    dispatch("addmeetup");
  }

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: addressValid = !isEmpty(address);
  $: contactEmailValid = isValidEmail(contactEmail);
  $: descriptionValid = !isEmpty(description);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    imageUrlValid &&
    addressValid &&
    contactEmailValid &&
    descriptionValid;

  function cancel() {
    dispatch("cancel");
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup data" on:cancel>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      label="Subtitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="imageUrl"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid Image URL."
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="address"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={event => (address = event.target.value)} />

    <TextInput
      id="email"
      label="Email"
      controlType="email"
      valid={contactEmailValid}
      validityMessage="Please enter a valid email address."
      value={contactEmail}
      on:input={event => (contactEmail = event.target.value)} />

    <TextInput
      id="description"
      label="Description"
      controlType="textarea"
      rows="3"
      valid={description}
      validityMessage="Please enter a valid description."
      value={description}
      on:input={event => (description = event.target.value)} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancel}>Cancel</Button>
    <Button type="button" on:click={submitForm} disabled={!formIsValid}>
      Save
    </Button>
  </div>
</Modal>
