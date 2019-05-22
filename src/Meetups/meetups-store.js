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

const customMeetupsStore = {
	subscribe: meetups.subscribe,
	addMeetup: meetupData => {
		const newMeetup = {
			id: Math.round.toString(),
			...meetupData,
			isFavorite: false
		};
		meetups.update(items => [newMeetup, ...items]);
	},
	toggleFavorite: index => {
		meetups.update(items => {
			const updatedMeetup = { ...items[index] };
			updatedMeetup.isFavorite = !updatedMeetup.isFavorite;
			return [
				...items.slice(0, index),
				updatedMeetup,
				...items.slice(index + 1)
			];
		});
	}
};

export default customMeetupsStore;
