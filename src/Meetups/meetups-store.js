import { codingImageUrl, swimmingImageUrl } from "../constants";

import { writable } from "svelte/store";

const meetups = writable([
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
]);

export default meetups;
