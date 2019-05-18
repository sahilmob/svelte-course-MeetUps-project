<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import { codingImageUrl, swimmingImageUrl } from "./constants";

  const meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "In this meetup, we will have some experts that teach you how to code",
      imageUrl: codingImageUrl,
      address: "27th Nerd Road, 324325 New York",
      contactEmail: "code@test.com"
    },
    {
      id: "m2",
      title: "Swim Together",
      subtitle: "Let's go for some swimming",
      description: "We will simply, swim some rounds!",
      imageUrl: swimmingImageUrl,
      address: "27th Nerd Road, 324325 New York",
      contactEmail: "swim@test.com"
    }
  ];
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

<Header />

<main>
  <MeetupGrid {meetups} />
</main>
